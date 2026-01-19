import { NextRequest, NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';
import { SSOClient, GetRoleCredentialsCommand } from '@aws-sdk/client-sso';

// This endpoint reads AWS SSO credentials from local AWS CLI cache
export async function GET(request: NextRequest) {
  try {
    const awsDir = join(homedir(), '.aws');
    const configPath = join(awsDir, 'config');
    const ssoCacheDir = join(awsDir, 'sso', 'cache');

    // Read AWS config to get SSO profiles
    let configContent: string;
    try {
      configContent = await readFile(configPath, 'utf-8');
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'AWS config not found. Please run "aws configure sso" first.',
          needsSetup: true 
        },
        { status: 404 }
      );
    }

    // Parse AWS config to find SSO profiles
    const profiles: any[] = [];
    const profileRegex = /\[profile ([^\]]+)\]([^[]*)/g;
    let match;

    while ((match = profileRegex.exec(configContent)) !== null) {
      const profileName = match[1];
      const profileContent = match[2];
      
      const ssoStartUrlMatch = profileContent.match(/sso_start_url\s*=\s*(.+)/);
      const ssoRegionMatch = profileContent.match(/sso_region\s*=\s*(.+)/);
      const ssoAccountIdMatch = profileContent.match(/sso_account_id\s*=\s*(.+)/);
      const ssoRoleNameMatch = profileContent.match(/sso_role_name\s*=\s*(.+)/);
      const regionMatch = profileContent.match(/region\s*=\s*(.+)/);

      if (ssoStartUrlMatch && ssoRegionMatch) {
        profiles.push({
          name: profileName,
          ssoStartUrl: ssoStartUrlMatch[1].trim(),
          ssoRegion: ssoRegionMatch[1].trim(),
          ssoAccountId: ssoAccountIdMatch?.[1].trim(),
          ssoRoleName: ssoRoleNameMatch?.[1].trim(),
          region: regionMatch?.[1].trim() || ssoRegionMatch[1].trim(),
        });
      }
    }

    if (profiles.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No SSO profiles found. Please run "aws configure sso" first.',
          needsSetup: true 
        },
        { status: 404 }
      );
    }

    // Try to find valid cached SSO tokens
    let cacheFiles: string[] = [];
    try {
      cacheFiles = await readdir(ssoCacheDir);
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No cached SSO tokens found. Please run "aws sso login --profile <profile-name>" first.',
          profiles: profiles.map(p => p.name),
          needsLogin: true 
        },
        { status: 401 }
      );
    }

    // Find the most recent non-expired token
    let validToken = null;
    const now = new Date().getTime();

    for (const file of cacheFiles) {
      if (file.endsWith('.json')) {
        try {
          const cachePath = join(ssoCacheDir, file);
          const cacheContent = await readFile(cachePath, 'utf-8');
          const cache = JSON.parse(cacheContent);

          // Check if token is valid and not expired
          if (cache.accessToken && cache.expiresAt) {
            const expiresAt = new Date(cache.expiresAt).getTime();
            if (expiresAt > now) {
              validToken = cache;
              break;
            }
          }
        } catch (error) {
          // Skip invalid cache files
          continue;
        }
      }
    }

    if (!validToken) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'SSO token expired. Please run "aws sso login --profile <profile-name>" first.',
          profiles: profiles.map(p => p.name),
          needsLogin: true 
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      profiles,
      hasValidToken: true,
      tokenExpiry: validToken.expiresAt,
    });

  } catch (error: any) {
    console.error('Local SSO error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to read local SSO configuration',
      },
      { status: 500 }
    );
  }
}

// Get credentials for a specific profile
export async function POST(request: NextRequest) {
  try {
    const { profileName } = await request.json();

    if (!profileName) {
      return NextResponse.json(
        { error: 'Profile name is required' },
        { status: 400 }
      );
    }

    const awsDir = join(homedir(), '.aws');
    const configPath = join(awsDir, 'config');
    const ssoCacheDir = join(awsDir, 'sso', 'cache');

    // Read profile configuration
    const configContent = await readFile(configPath, 'utf-8');
    const profileRegex = new RegExp(`\\[profile ${profileName}\\]([^[]*)`, 'i');
    const match = configContent.match(profileRegex);

    if (!match) {
      return NextResponse.json(
        { error: `Profile "${profileName}" not found` },
        { status: 404 }
      );
    }

    const profileContent = match[1];
    const ssoStartUrl = profileContent.match(/sso_start_url\s*=\s*(.+)/)?.[1].trim();
    const ssoRegion = profileContent.match(/sso_region\s*=\s*(.+)/)?.[1].trim();
    const ssoAccountId = profileContent.match(/sso_account_id\s*=\s*(.+)/)?.[1].trim();
    const ssoRoleName = profileContent.match(/sso_role_name\s*=\s*(.+)/)?.[1].trim();
    const region = profileContent.match(/region\s*=\s*(.+)/)?.[1].trim() || ssoRegion;

    if (!ssoStartUrl || !ssoRegion || !ssoAccountId || !ssoRoleName) {
      return NextResponse.json(
        { error: 'Incomplete SSO configuration in profile' },
        { status: 400 }
      );
    }

    // Find valid cached token
    const cacheFiles = await readdir(ssoCacheDir);
    let validToken = null;
    const now = new Date().getTime();

    for (const file of cacheFiles) {
      if (file.endsWith('.json')) {
        try {
          const cachePath = join(ssoCacheDir, file);
          const cacheContent = await readFile(cachePath, 'utf-8');
          const cache = JSON.parse(cacheContent);

          if (cache.accessToken && cache.expiresAt) {
            const expiresAt = new Date(cache.expiresAt).getTime();
            if (expiresAt > now && cache.startUrl === ssoStartUrl) {
              validToken = cache;
              break;
            }
          }
        } catch (error) {
          continue;
        }
      }
    }

    if (!validToken) {
      return NextResponse.json(
        { 
          error: `No valid SSO token found for profile "${profileName}". Please run: aws sso login --profile ${profileName}`,
          needsLogin: true 
        },
        { status: 401 }
      );
    }

    // Get role credentials using the cached token
    const ssoClient = new SSOClient({ region: ssoRegion });

    const command = new GetRoleCredentialsCommand({
      accessToken: validToken.accessToken,
      accountId: ssoAccountId,
      roleName: ssoRoleName,
    });

    const response = await ssoClient.send(command);

    return NextResponse.json({
      success: true,
      credentials: {
        accessKeyId: response.roleCredentials?.accessKeyId,
        secretAccessKey: response.roleCredentials?.secretAccessKey,
        sessionToken: response.roleCredentials?.sessionToken,
        region: region,
      },
      profile: {
        name: profileName,
        accountId: ssoAccountId,
        roleName: ssoRoleName,
      },
      expiration: response.roleCredentials?.expiration,
    });

  } catch (error: any) {
    console.error('Get credentials error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to get credentials',
      },
      { status: 500 }
    );
  }
}
