# AWS SSO Authentication Setup

The application now supports two authentication methods:

## Option 1: Manual Credentials (Existing Method)

1. Go to Settings page
2. Select **"Manual Credentials"**
3. Enter your AWS credentials:
   - Access Key ID
   - Secret Access Key
   - Session Token (if using temporary credentials)
   - Region
4. Click "Save Settings" and "Test Connection"

## Option 2: AWS SSO Login (New Method)

### Prerequisites
- Your organization must have AWS SSO (IAM Identity Center) configured
- You need your AWS SSO start URL (e.g., `https://your-org.awsapps.com/start`)

### Setup Steps

1. **Get Your SSO Start URL**
   - Ask your AWS administrator for your organization's SSO start URL
   - It typically looks like: `https://your-company.awsapps.com/start`

2. **Login via SSO**
   - Go to Settings page
   - Select **"AWS SSO Login"**
   - Enter your SSO Start URL
   - Select your SSO Region (usually same as your Bedrock region)
   - Click **"Sign in with AWS SSO"**

3. **Authorize in Browser**
   - A new browser tab will open with AWS SSO login page
   - Enter your corporate credentials
   - You may need to enter a verification code (shown in the app)
   - Click "Allow" to grant access

4. **Select Account & Role**
   - Back in the app, select your AWS account from the dropdown
   - Select the appropriate IAM role (must have Bedrock permissions)
   - Credentials will be automatically saved

5. **Verify Connection**
   - The app will automatically test the connection
   - You should see "✅ SSO complete and connection verified!"

### SSO Benefits

- ✅ **More Secure**: No need to copy/paste long credentials
- ✅ **Automatic**: Credentials are fetched automatically
- ✅ **Centralized**: Uses your corporate identity
- ✅ **Auditable**: All access is logged in AWS CloudTrail

### Troubleshooting

**Problem**: "SSO failed: Missing required parameters"
- Solution: Make sure your SSO Start URL is correct and region matches

**Problem**: "Authorization timeout"
- Solution: Complete the browser authorization within 5 minutes

**Problem**: "Connection failed after SSO"
- Solution: Ensure your selected role has `bedrock:InvokeModel` permissions

**Problem**: Can't see my account/role
- Solution: Contact your AWS administrator to verify your SSO permissions

### Required IAM Permissions

The IAM role you select must have these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": "arn:aws:bedrock:*::foundation-model/*"
    }
  ]
}
```

### Security Notes

- SSO credentials are temporary and expire (typically after 1-12 hours)
- They are stored securely in your browser's localStorage
- The app will prompt you to re-authenticate when they expire
- No credentials are sent to any server except AWS APIs
