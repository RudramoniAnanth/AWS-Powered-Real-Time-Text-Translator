# AWS Text Translator Pro - Deployment Guide

This guide provides step-by-step instructions for deploying the AWS Text Translator application to AWS cloud services.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Lambda Function Setup](#lambda-function-setup)
3. [S3 Static Website Setup](#s3-static-website-setup)
4. [Testing the Application](#testing-the-application)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:
- An active AWS account
- Basic familiarity with AWS Console
- The project files downloaded locally

---

## Lambda Function Setup

### Step 1: Create Lambda Function

1. Log in to AWS Console and navigate to **Lambda**
2. Click **Create function**
3. Choose **Author from scratch**
4. Configure the function:
   - **Function name**: `TextTranslatorFunction`
   - **Runtime**: Python 3.12 (or latest Python 3.x)
   - **Architecture**: x86_64
5. Click **Create function**

### Step 2: Add Lambda Code

1. In the Lambda function page, scroll to **Code source**
2. Delete the default code in `lambda_function.py`
3. Copy and paste the code from your local `lambda_function.py` file
4. Click **Deploy** to save changes

### Step 3: Configure IAM Permissions

1. Go to the **Configuration** tab
2. Click **Permissions** in the left sidebar
3. Click on the **Role name** (opens IAM console)
4. Click **Add permissions** → **Attach policies**
5. Search for and select **TranslateFullAccess**
6. Click **Add permissions**

### Step 4: Create Function URL

1. In Lambda function, go to **Configuration** tab
2. Click **Function URL** in the left sidebar
3. Click **Create function URL**
4. Configure:
   - **Auth type**: NONE (for public access)
   - **CORS Configuration**:
     - Allow origin: `*`
     - Allow methods: `POST, OPTIONS`
     - Allow headers: `Content-Type`
     - Max age: `86400`
5. Click **Save**
6. **Copy the Function URL** - you'll need this for the frontend

### Step 5: Test Lambda Function

1. Go to the **Test** tab
2. Create a new test event:
```json
{
  "body": "{\"text\": \"Hello\", \"source_lang\": \"auto\", \"target_lang\": \"es\"}"
}
```
3. Click **Test**
4. Verify the response shows translated text

---

## S3 Static Website Setup

### Step 1: Create S3 Bucket

1. Navigate to **S3** in AWS Console
2. Click **Create bucket**
3. Configure:
   - **Bucket name**: `aws-translator-web-appli` (must be globally unique)
   - **Region**: `us-east-1` (or your preferred region)
   - **Uncheck** "Block all public access"
   - Acknowledge the warning about public access
4. Click **Create bucket**

### Step 2: Enable Static Website Hosting

1. Open your newly created bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Configure:
   - **Static website hosting**: Enable
   - **Hosting type**: Host a static website
   - **Index document**: `index.html`
   - **Error document**: `index.html` (optional)
6. Click **Save changes**
7. **Note the website endpoint URL** (e.g., `http://aws-translator-web-appli.s3-website-us-east-1.amazonaws.com`)

### Step 3: Apply Bucket Policy

1. Go to **Permissions** tab
2. Scroll to **Bucket policy**
3. Click **Edit**
4. Paste the following policy (replace `YOUR-BUCKET-NAME` with your actual bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

5. Click **Save changes**

### Step 4: Update Frontend Configuration

1. Open `src/config.ts` in a text editor
2. Find the line with `export const LAMBDA_URL = ...`
3. Replace the URL with your Lambda Function URL from Step 4 of Lambda setup
4. Save the file

### Step 5: Build the React Application

1. Open terminal in the project directory
2. Install dependencies (if not already done):
```bash
npm install
```
3. Build the production bundle:
```bash
npm run build
```
4. This creates optimized files in the `dist/` directory

### Step 6: Upload Frontend to S3

1. In your S3 bucket, go to **Objects** tab
2. Click **Upload**
3. Click **Add files** and **Add folder**
4. Select ALL files and folders from the `dist/` directory
5. **Important**: Upload the contents of `dist/`, not the `dist/` folder itself
6. Click **Upload**
7. Wait for upload to complete

### Step 7: Verify Upload

1. Ensure the following files are in the root of your bucket:
   - `index.html`
   - `vite.svg` (or your favicon)
   - `assets/` folder (containing JS and CSS files)
2. Check that file permissions are inherited from bucket policy

---

## Testing the Application

### Test the Complete Flow

1. Open the S3 website endpoint URL in your browser
2. Enter some text in the source text area
3. Select source and target languages
4. Click **Translate**
5. Verify the translation appears in the result area

### Test Different Scenarios

- **Auto-detect**: Set source to "Auto-detect" and enter text
- **Language swap**: Click the swap button to exchange languages
- **Error handling**: Try translating empty text or same source/target languages
- **Character limit**: Test with text approaching 5000 characters

---

## Troubleshooting

### Issue: "Network error" or CORS error

**Solution:**
- Verify Lambda Function URL CORS settings allow `*` origin
- Check browser console for specific CORS errors
- Ensure Lambda function returns proper CORS headers

### Issue: Translation returns error

**Solution:**
- Verify Lambda function has TranslateFullAccess IAM policy
- Check Lambda CloudWatch logs for detailed error messages
- Test Lambda function directly in AWS Console

### Issue: S3 website shows 403 Forbidden

**Solution:**
- Verify bucket policy is correctly applied
- Ensure "Block all public access" is disabled
- Check that file is named `index.html` (not `AWS_TRANSLATOR.HTML`)

### Issue: S3 website shows 404 Not Found

**Solution:**
- Verify static website hosting is enabled
- Check index document is set to `index.html`
- Ensure file was uploaded successfully

### Issue: Lambda timeout

**Solution:**
- Increase Lambda timeout in Configuration → General configuration
- Default is 3 seconds, increase to 30 seconds if needed

---

## Cost Optimization Tips

1. **Use AWS Free Tier**: Lambda and S3 have generous free tiers
2. **Monitor Usage**: Set up CloudWatch alarms for unexpected usage
3. **Clean Up**: Delete resources when not needed for testing
4. **Consider CloudFront**: For production, add CloudFront CDN for better performance and lower S3 costs

---

## Security Best Practices

1. **Restrict Lambda Permissions**: Use least privilege IAM policies
2. **Enable CloudTrail**: Monitor API calls for security auditing
3. **Add Rate Limiting**: Consider API Gateway for production to prevent abuse
4. **Use HTTPS**: For production, use CloudFront with SSL certificate
5. **Implement Authentication**: Add Cognito for user authentication in production

---

## Next Steps

After successful deployment:
- Test thoroughly with different languages
- Monitor CloudWatch logs for errors
- Consider adding CloudFront for better performance
- Implement user feedback mechanisms
- Add analytics to track usage

---

## Additional Resources

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Amazon Translate Documentation](https://docs.aws.amazon.com/translate/)
- [S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Lambda Function URLs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html)

---

## Support

For AWS-specific issues, refer to:
- AWS Support Center
- AWS Documentation
- AWS Forums and Community

For application issues, review:
- CloudWatch Logs for Lambda errors
- Browser console for frontend errors
- Network tab for API request/response details
