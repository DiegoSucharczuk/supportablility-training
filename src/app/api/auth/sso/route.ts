import { NextRequest, NextResponse } from 'next/server';
import { SSOClient, GetRoleCredentialsCommand, ListAccountsCommand, ListAccountRolesCommand } from '@aws-sdk/client-sso';
import { SSOOIDCClient, CreateTokenCommand, RegisterClientCommand, StartDeviceAuthorizationCommand } from '@aws-sdk/client-sso-oidc';

// This endpoint helps initiate AWS SSO device authorization flow
export async function POST(request: NextRequest) {
  try {
    const { action, startUrl, region, deviceCode, userCode } = await request.json();

    // Device Authorization Flow
    if (action === 'start') {
      if (!startUrl || !region) {
        return NextResponse.json(
          { error: 'SSO start URL and region are required' },
          { status: 400 }
        );
      }

      const ssoOidcClient = new SSOOIDCClient({ region });

      // Step 1: Register client
      const registerCommand = new RegisterClientCommand({
        clientName: 'Supportability Training App',
        clientType: 'public',
      });
      
      const registerResponse = await ssoOidcClient.send(registerCommand);
      const { clientId, clientSecret } = registerResponse;

      // Step 2: Start device authorization
      const authCommand = new StartDeviceAuthorizationCommand({
        clientId: clientId!,
        clientSecret: clientSecret!,
        startUrl,
      });

      const authResponse = await ssoOidcClient.send(authCommand);

      return NextResponse.json({
        success: true,
        deviceCode: authResponse.deviceCode,
        userCode: authResponse.userCode,
        verificationUri: authResponse.verificationUri,
        verificationUriComplete: authResponse.verificationUriComplete,
        expiresIn: authResponse.expiresIn,
        interval: authResponse.interval,
        clientId,
        clientSecret,
      });
    }

    // Get token after user authorizes
    if (action === 'token') {
      const { clientId, clientSecret, deviceCode } = await request.json();
      
      if (!clientId || !clientSecret || !deviceCode) {
        return NextResponse.json(
          { error: 'Missing required parameters for token request' },
          { status: 400 }
        );
      }

      const ssoOidcClient = new SSOOIDCClient({ region });

      const tokenCommand = new CreateTokenCommand({
        clientId,
        clientSecret,
        deviceCode,
        grantType: 'urn:ietf:params:oauth:grant-type:device_code',
      });

      const tokenResponse = await ssoOidcClient.send(tokenCommand);

      return NextResponse.json({
        success: true,
        accessToken: tokenResponse.accessToken,
        expiresIn: tokenResponse.expiresIn,
      });
    }

    // Get AWS credentials using SSO access token
    if (action === 'credentials') {
      const { accessToken, accountId, roleName } = await request.json();

      if (!accessToken || !accountId || !roleName) {
        return NextResponse.json(
          { error: 'Missing required parameters for credentials' },
          { status: 400 }
        );
      }

      const ssoClient = new SSOClient({ region });

      const credentialsCommand = new GetRoleCredentialsCommand({
        accessToken,
        accountId,
        roleName,
      });

      const credentialsResponse = await ssoClient.send(credentialsCommand);

      return NextResponse.json({
        success: true,
        credentials: {
          accessKeyId: credentialsResponse.roleCredentials?.accessKeyId,
          secretAccessKey: credentialsResponse.roleCredentials?.secretAccessKey,
          sessionToken: credentialsResponse.roleCredentials?.sessionToken,
          expiration: credentialsResponse.roleCredentials?.expiration,
        },
      });
    }

    // List available accounts
    if (action === 'accounts') {
      const { accessToken } = await request.json();

      if (!accessToken) {
        return NextResponse.json(
          { error: 'Access token is required' },
          { status: 400 }
        );
      }

      const ssoClient = new SSOClient({ region });

      const accountsCommand = new ListAccountsCommand({
        accessToken,
      });

      const accountsResponse = await ssoClient.send(accountsCommand);

      return NextResponse.json({
        success: true,
        accounts: accountsResponse.accountList,
      });
    }

    // List roles for an account
    if (action === 'roles') {
      const { accessToken, accountId } = await request.json();

      if (!accessToken || !accountId) {
        return NextResponse.json(
          { error: 'Access token and account ID are required' },
          { status: 400 }
        );
      }

      const ssoClient = new SSOClient({ region });

      const rolesCommand = new ListAccountRolesCommand({
        accessToken,
        accountId,
      });

      const rolesResponse = await ssoClient.send(rolesCommand);

      return NextResponse.json({
        success: true,
        roles: rolesResponse.roleList,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('SSO error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'SSO authentication failed',
        code: error.name,
      },
      { status: 500 }
    );
  }
}
