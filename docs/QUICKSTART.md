# Quick Start Guide

Get AWS Text Translator Pro running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- AWS account
- 5 minutes of your time

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Set Up AWS Lambda (2 minutes)

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. Create function → Author from scratch
3. Name: `TextTranslatorFunction`, Runtime: Python 3.12
4. Copy code from `lambda_function.py` → Deploy
5. Configuration → Permissions → Add `TranslateFullAccess` policy
6. Configuration → Function URL → Create (Auth: NONE, CORS: enabled)
7. **Copy the Function URL**

## Step 3: Configure Frontend (30 seconds)

1. Open `src/config.ts`
2. Replace `LAMBDA_URL` with your Function URL
3. Save

## Step 4: Run Locally (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 and test!

## Step 5: Deploy to S3 (1 minute)

```bash
# Build
npm run build

# Create S3 bucket and enable static hosting
# Upload dist/ contents to bucket
# Apply public read policy
```

Done! 🎉

## Need Help?

- Detailed setup: See [SETUP.md](SETUP.md)
- Deployment guide: See [deployment-guide.md](deployment-guide.md)
- Full docs: See [README.md](README.md)

## Test Translation

Try translating:
- "Hello, how are you?" (English → Spanish)
- "Bonjour" (Auto-detect → English)
- "こんにちは" (Auto-detect → English)

## Common Issues

**Translation fails?**
→ Check Lambda URL in `src/config.ts`

**Build fails?**
→ Run `npm install` again

**S3 403 error?**
→ Check bucket policy allows public read

## What's Next?

- Add custom domain
- Enable HTTPS with CloudFront
- Monitor with CloudWatch
- Add more features!

---

**Total Time**: ~5 minutes
**Cost**: ~$1-2/month for low traffic
