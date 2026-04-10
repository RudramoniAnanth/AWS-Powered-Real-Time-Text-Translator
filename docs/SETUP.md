# AWS Text Translator Pro - Setup Guide

This guide will help you set up and run the AWS Text Translator Pro application locally and deploy it to AWS.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [AWS Backend Setup](#aws-backend-setup)
4. [Frontend Configuration](#frontend-configuration)
5. [Deployment to S3](#deployment-to-s3)
6. [Verification](#verification)

---

## Prerequisites

### Required Software
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For version control (optional)
- **AWS Account**: Active AWS account with billing enabled

### Check Your Versions
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

### Install Node.js
If you don't have Node.js installed:
- Download from [nodejs.org](https://nodejs.org/)
- Choose the LTS (Long Term Support) version
- Follow the installation wizard

---

## Local Setup

### Step 1: Get the Project Files

If you have the project as a ZIP file:
```bash
# Extract the ZIP file
# Navigate to the extracted folder
cd aws-text-translator-pro
```

If you're cloning from Git:
```bash
git clone <repository-url>
cd aws-text-translator-pro
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React and React DOM
- TypeScript
- Vite (build tool)
- Lucide React (icons)
- ESLint (code quality)

**Expected output**: You should see a progress bar and "added XXX packages" message.

### Step 3: Verify Installation

```bash
npm list --depth=0
```

You should see all dependencies listed without errors.

---

## AWS Backend Setup

### Step 1: Create Lambda Function

1. **Log in to AWS Console**
   - Go to [console.aws.amazon.com](https://console.aws.amazon.com)
   - Sign in with your AWS account

2. **Navigate to Lambda**
   - Search for "Lambda" in the services search bar
   - Click on "Lambda"

3. **Create Function**
   - Click **Create function**
   - Choose **Author from scratch**
   - Function name: `TextTranslatorFunction`
   - Runtime: **Python 3.12** (or latest Python 3.x)
   - Architecture: **x86_64**
   - Click **Create function**

### Step 2: Add Lambda Code

1. In the Lambda function page, scroll to **Code source**
2. Delete the default code in `lambda_function.py`
3. Open the `lambda/lambda_function.py` file from your project
4. Copy all the code
5. Paste it into the Lambda code editor
6. Click **Deploy** (orange button at the top)
7. Wait for "Successfully updated the function" message

### Step 3: Configure IAM Permissions

1. Click on the **Configuration** tab
2. Click **Permissions** in the left sidebar
3. Under "Execution role", click on the **Role name** link
   - This opens the IAM console in a new tab
4. Click **Add permissions** → **Attach policies**
5. In the search box, type: `TranslateFullAccess`
6. Check the box next to **TranslateFullAccess**
7. Click **Add permissions**
8. You should see "TranslateFullAccess" in the permissions list

### Step 4: Create Function URL

1. Go back to your Lambda function tab
2. Click on the **Configuration** tab
3. Click **Function URL** in the left sidebar
4. Click **Create function URL**
5. Configure:
   - **Auth type**: NONE
   - **Configure cross-origin resource sharing (CORS)**: Check this box
   - **Allow origin**: `*`
   - **Allow methods**: `POST, OPTIONS`
   - **Allow headers**: `Content-Type`
   - **Max age**: `86400`
6. Click **Save**
7. **IMPORTANT**: Copy the Function URL
   - It looks like: `https://xxxxxxxxxx.lambda-url.us-east-1.on.aws/`
   - Save this URL - you'll need it in the next section

### Step 5: Test Lambda Function

1. Go to the **Test** tab
2. Click **Create new event**
3. Event name: `TestTranslation`
4. Replace the JSON with:
```json
{
  "body": "{\"text\": \"Hello\", \"source_lang\": \"auto\", \"target_lang\": \"es\"}"
}
```
5. Click **Save**
6. Click **Test**
7. You should see a successful response with translated text

---

## Frontend Configuration

### Step 1: Update Lambda URL

1. Open `src/config.ts` in your code editor
2. Find this line:
```typescript
export const LAMBDA_URL = 'https://3sbchj4ofrvigmutxttifqcyum0ozgde.lambda-url.us-east-1.on.aws/';
```
3. Replace the URL with YOUR Lambda Function URL from Step 4 above
4. Save the file

### Step 2: Start Development Server

```bash
npm run dev
```

**Expected output**:
```
VITE v4.4.5  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 3: Test Locally

1. Open your browser
2. Go to `http://localhost:3000`
3. You should see the AWS Text Translator Pro interface
4. Try translating some text:
   - Enter "Hello, how are you?" in the source text
   - Select "Auto-detect" for source language
   - Select "Spanish" for target language
   - Click "Translate"
   - You should see the Spanish translation

### Step 4: Verify Everything Works

Test these features:
- [ ] Text input and character counter
- [ ] Language selection dropdowns
- [ ] Translate button
- [ ] Translation appears in output
- [ ] Auto-detect shows detected language
- [ ] Copy button works
- [ ] Language swap button works
- [ ] Error messages for empty input

If everything works, you're ready to deploy!

---

## Deployment to S3

### Step 1: Build Production Version

1. Stop the development server (Ctrl+C)
2. Build the production bundle:
```bash
npm run build
```

**Expected output**:
```
vite v4.4.5 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB
dist/assets/index-XXXXX.css      XX.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB
✓ built in X.XXs
```

3. Verify the `dist/` folder was created
4. Check that it contains:
   - `index.html`
   - `assets/` folder with CSS and JS files

### Step 2: Create S3 Bucket

1. **Go to S3 Console**
   - Search for "S3" in AWS Console
   - Click on "S3"

2. **Create Bucket**
   - Click **Create bucket**
   - Bucket name: `aws-translator-web-app-[your-name]`
     - Must be globally unique
     - Use lowercase letters, numbers, and hyphens only
   - Region: **US East (N. Virginia) us-east-1**
   - **Uncheck** "Block all public access"
   - Check the acknowledgment box
   - Click **Create bucket**

### Step 3: Enable Static Website Hosting

1. Click on your newly created bucket
2. Go to **Properties** tab
3. Scroll down to **Static website hosting**
4. Click **Edit**
5. Select **Enable**
6. Hosting type: **Host a static website**
7. Index document: `index.html`
8. Error document: `index.html` (optional)
9. Click **Save changes**
10. **Note the website endpoint URL** (you'll need this to access your site)
    - Example: `http://aws-translator-web-app-yourname.s3-website-us-east-1.amazonaws.com`

### Step 4: Apply Bucket Policy

1. Go to **Permissions** tab
2. Scroll to **Bucket policy**
3. Click **Edit**
4. Paste this policy (replace `YOUR-BUCKET-NAME` with your actual bucket name):

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

### Step 5: Upload Files

1. Go to **Objects** tab
2. Click **Upload**
3. Click **Add files**
4. Navigate to your project's `dist/` folder
5. Select `index.html`
6. Click **Add folder**
7. Select the `assets/` folder from `dist/`
8. Click **Upload**
9. Wait for "Upload succeeded" message
10. Click **Close**

### Step 6: Verify Upload

1. You should see these files in your bucket:
   - `index.html`
   - `assets/` folder
2. Click on `index.html`
3. Check the **Object URL** - this is your website URL

---

## Verification

### Test Your Deployed Application

1. **Open the S3 Website Endpoint**
   - Use the URL from Step 3 of S3 deployment
   - Example: `http://aws-translator-web-app-yourname.s3-website-us-east-1.amazonaws.com`

2. **Test All Features**
   - [ ] Page loads correctly
   - [ ] UI looks good (no broken styles)
   - [ ] Enter text and translate
   - [ ] Try different languages
   - [ ] Test auto-detect
   - [ ] Test language swap
   - [ ] Test copy button
   - [ ] Test on mobile device

3. **Check Browser Console**
   - Press F12 to open developer tools
   - Go to Console tab
   - Should see no errors (red messages)

### Common Issues and Solutions

#### Issue: "Network error" when translating
**Solution**: 
- Check Lambda Function URL in `src/config.ts` is correct
- Verify CORS is enabled on Lambda Function URL
- Check Lambda function has Translate permissions

#### Issue: S3 website shows 403 Forbidden
**Solution**:
- Verify bucket policy is applied correctly
- Check "Block all public access" is OFF
- Ensure bucket name in policy matches your bucket

#### Issue: S3 website shows 404 Not Found
**Solution**:
- Verify static website hosting is enabled
- Check index document is set to `index.html`
- Ensure files were uploaded to bucket root (not in a subfolder)

#### Issue: Styles not loading (plain HTML)
**Solution**:
- Verify `assets/` folder was uploaded
- Check that CSS files are in `assets/` folder
- Clear browser cache and reload

---

## Next Steps

### Production Enhancements

1. **Add Custom Domain**
   - Use Route 53 to map a custom domain
   - Example: `translator.yourdomain.com`

2. **Add HTTPS with CloudFront**
   - Create CloudFront distribution
   - Add SSL certificate from AWS Certificate Manager
   - Point to your S3 bucket

3. **Add Monitoring**
   - Enable CloudWatch logs for Lambda
   - Set up alarms for errors
   - Monitor translation costs

4. **Optimize Costs**
   - Monitor AWS billing dashboard
   - Set up budget alerts
   - Review usage patterns

### Development Workflow

1. **Make Changes Locally**
   - Edit files in `src/`
   - Test with `npm run dev`

2. **Build and Deploy**
   ```bash
   npm run build
   # Upload dist/ contents to S3
   ```

3. **Version Control**
   - Use Git to track changes
   - Create branches for features
   - Tag releases

---

## Support Resources

- **AWS Documentation**
  - [Lambda](https://docs.aws.amazon.com/lambda/)
  - [S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
  - [Amazon Translate](https://docs.aws.amazon.com/translate/)

- **React Documentation**
  - [React Docs](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/docs/)
  - [Vite](https://vitejs.dev/)

- **Project Files**
  - `README.md` - Project overview
  - `docs/deployment-guide.md` - Detailed deployment guide
  - `docs/PROJECT_SUMMARY.md` - Technical architecture

---

## Congratulations!

You've successfully set up and deployed AWS Text Translator Pro! 🎉

Your application is now live and accessible to anyone with the S3 website URL.
