# AWS Text Translator Pro

A modern, serverless web application built with React and TypeScript that provides real-time text translation using Amazon Translate service. The application features a professional UI with Tailwind CSS and is designed for deployment on AWS S3 as a static website.

## Project Overview

This is a full-stack serverless translation application that leverages AWS cloud services to provide fast, accurate translations between multiple languages. The frontend is a React single-page application (SPA) built with Vite and TypeScript, hosted on S3, while the backend uses AWS Lambda with Amazon Translate for processing translation requests.

## Architecture

```
User Browser
    ↓
S3 Static Website (React SPA)
    ↓
Lambda Function URL (Direct HTTP endpoint)
    ↓
AWS Lambda Function (Python)
    ↓
Amazon Translate Service
```

## Features

- **Modern React UI**: Built with React 18, TypeScript, and Tailwind CSS
- **Auto Language Detection**: Automatically detects the source language
- **16+ Supported Languages**: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Arabic, Hindi, Korean, Dutch, Polish, Turkish, and more
- **Real-time Translation**: Instant translation with loading indicators
- **Language Swap**: Quick swap between source and target languages
- **Character Counter**: Tracks input length (max 5000 characters)
- **Copy to Clipboard**: One-click copy of translated text
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: User-friendly error messages for various scenarios
- **Type Safety**: Full TypeScript support for better development experience

## Technology Stack

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **ESLint**: Code quality and consistency

### Backend
- **AWS Lambda**: Serverless compute
- **Python 3.12**: Lambda runtime
- **Amazon Translate**: AI-powered translation
- **Lambda Function URL**: Direct HTTP endpoint

### Deployment
- **Amazon S3**: Static website hosting
- **AWS IAM**: Permission management

## Project Structure

```
aws-text-translator-pro/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # App header with branding
│   │   ├── Footer.tsx              # App footer
│   │   ├── TranslatorPanel.tsx    # Main translation interface
│   │   ├── LanguageSelector.tsx   # Language dropdown component
│   │   ├── TextInput.tsx          # Source text input
│   │   ├── TranslationOutput.tsx  # Translation result display
│   │   └── ErrorMessage.tsx       # Error notification component
│   ├── utils/
│   │   ├── translationService.ts  # API service for translations
│   │   └── languageUtils.ts       # Language helper functions
│   ├── types.ts                   # TypeScript type definitions
│   ├── config.ts                  # App configuration
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # App entry point
├── lambda_function.py             # Backend Lambda function
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
├── .eslintrc.cjs                  # ESLint configuration
├── deployment-guide.md            # Deployment instructions
└── README.md                      # This file
```

## Deployment

### Prerequisites
- AWS Account
- AWS CLI configured (optional)
- Basic knowledge of AWS Console

### Quick Deployment Steps

1. **Deploy Lambda Function**
   - Create a new Lambda function in AWS Console
   - Copy code from `lambda_function.py`
   - Add IAM role with `TranslateFullAccess` policy
   - Create and enable Lambda Function URL
   - Configure CORS settings

2. **Update Frontend Configuration**
   - Open `AWS_TRANSLATOR.HTML`
   - Replace `LAMBDA_URL` with your Lambda Function URL

3. **Deploy to S3**
   - Create an S3 bucket (e.g., `aws-translator-web-appli`)
   - Enable static website hosting
   - Apply the bucket policy from `s3-bucket-policy.json`
   - Upload `AWS_TRANSLATOR.HTML` as `index.html`

4. **Access Your Application**
   - Use the S3 website endpoint URL
   - Example: `http://aws-translator-web-appli.s3-website-us-east-1.amazonaws.com`

For detailed instructions, see `deployment-guide.md`

## Configuration

### Lambda Function URL
Current endpoint: `https://3sbchj4ofrvigmutxttifqcyum0ozgde.lambda-url.us-east-1.on.aws/`

### S3 Bucket
Bucket name: `aws-translator-web-appli`
Region: `us-east-1`

## API Request Format

```json
{
  "text": "Hello, world!",
  "source_lang": "auto",
  "target_lang": "es"
}
```

## API Response Format

```json
{
  "translatedText": "¡Hola, mundo!",
  "sourceLanguage": "en"
}
```

## Cost Considerations

- **S3**: Minimal cost for static hosting (typically < $1/month for low traffic)
- **Lambda**: Free tier includes 1M requests/month
- **Amazon Translate**: $15 per million characters translated
- **Data Transfer**: Standard AWS data transfer rates apply

## Security Features

- CORS enabled for cross-origin requests
- S3 bucket policy restricts to read-only access
- Lambda function has minimal IAM permissions
- No sensitive data stored in frontend code

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Limitations

- Maximum 5000 characters per translation
- Requires internet connection
- Subject to AWS service quotas

## Future Enhancements

- [ ] Add text-to-speech functionality
- [ ] Implement translation history
- [ ] Add copy-to-clipboard feature
- [ ] Support for document translation
- [ ] User authentication with Cognito
- [ ] Dark mode theme

## Troubleshooting

**Translation not working?**
- Verify Lambda Function URL is correct in HTML file
- Check Lambda function has Translate permissions
- Ensure CORS is properly configured

**S3 website not accessible?**
- Verify bucket policy allows public read access
- Check static website hosting is enabled
- Confirm index document is set to `index.html`

## License

This project is open source and available for educational purposes.

## Author

Created as a demonstration of AWS serverless architecture and cloud services integration.

## Support

For issues or questions, please refer to AWS documentation:
- [Amazon Translate](https://docs.aws.amazon.com/translate/)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/)
- [Amazon S3](https://docs.aws.amazon.com/s3/)


## Getting Started

### Prerequisites
- Node.js 18+ and npm
- AWS Account
- AWS CLI configured (optional)
- Basic knowledge of React and AWS Console

### Local Development

1. **Clone or download the project**

2. **Install dependencies**
```bash
npm install
```

3. **Update Lambda Function URL**
   - Open `src/config.ts`
   - Replace `LAMBDA_URL` with your Lambda Function URL

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Backend Deployment (AWS Lambda)

1. **Create Lambda Function**
   - Go to AWS Lambda Console
   - Create new function with Python 3.12 runtime
   - Copy code from `lambda_function.py`

2. **Configure IAM Permissions**
   - Attach `TranslateFullAccess` policy to Lambda execution role

3. **Create Function URL**
   - Enable Function URL with CORS
   - Set auth type to NONE for public access
   - Configure CORS: Allow origin `*`, methods `POST, OPTIONS`

4. **Copy Function URL**
   - Update `src/config.ts` with your Lambda Function URL

### Frontend Deployment (S3 Static Website)

1. **Build the application**
```bash
npm run build
```

2. **Create S3 Bucket**
   - Bucket name: `aws-translator-web-app` (must be unique)
   - Region: `us-east-1` (or your preferred region)
   - Uncheck "Block all public access"

3. **Enable Static Website Hosting**
   - Go to Properties → Static website hosting
   - Enable and set index document to `index.html`

4. **Apply Bucket Policy**
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

5. **Upload Build Files**
   - Upload all files from `dist/` directory to S3 bucket
   - Ensure proper content types are set

6. **Access Your Application**
   - Use S3 website endpoint URL
   - Example: `http://aws-translator-web-app.s3-website-us-east-1.amazonaws.com`

For detailed deployment instructions, see [deployment-guide.md](deployment-guide.md)

## Configuration

### Lambda Function URL
Update in `src/config.ts`:
```typescript
export const LAMBDA_URL = 'https://YOUR-LAMBDA-URL.lambda-url.us-east-1.on.aws/';
```

### Supported Languages
Add or remove languages in `src/config.ts`:
```typescript
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  // Add more languages...
];
```

## API Documentation

### Translation Endpoint

**URL**: Lambda Function URL

**Method**: POST

**Request Body**:
```json
{
  "text": "Hello, world!",
  "source_lang": "auto",
  "target_lang": "es"
}
```

**Success Response** (200):
```json
{
  "translatedText": "¡Hola, mundo!",
  "sourceLanguage": "en"
}
```

**Error Response** (400/500):
```json
{
  "error": "Error message description"
}
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Cost Considerations

### Estimated Monthly Costs (Low Traffic)

| Service | Usage | Estimated Cost |
|---------|-------|----------------|
| S3 Storage | 10 MB | ~$0.00 |
| S3 Requests | 10,000 GET | $0.004 |
| Lambda Invocations | 5,000 | Free Tier |
| Lambda Compute | 5,000 × 1s × 128MB | Free Tier |
| Amazon Translate | 100,000 characters | $1.50 |
| Data Transfer | 1 GB out | $0.09 |
| **Total** | | **~$1.60/month** |

### AWS Free Tier Benefits
- Lambda: 1M requests + 400,000 GB-seconds/month
- S3: 5 GB storage + 20,000 GET requests (first 12 months)
- Translate: Pay-per-use (no free tier)

## Security Features

- CORS enabled for cross-origin requests
- S3 bucket policy restricts to read-only access
- Lambda function has minimal IAM permissions
- No sensitive data stored in frontend code
- Input validation and sanitization
- TypeScript for type safety

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Translation not working?
- Verify Lambda Function URL is correct in `src/config.ts`
- Check Lambda function has Translate permissions
- Ensure CORS is properly configured on Lambda Function URL
- Check browser console for errors

### Build errors?
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 18 or higher
- Check for TypeScript errors with `npm run lint`

### S3 website not accessible?
- Verify bucket policy allows public read access
- Check static website hosting is enabled
- Confirm index document is set to `index.html`
- Ensure all files from `dist/` are uploaded

## Performance Optimization

- Vite for fast builds and HMR
- Code splitting for optimal bundle size
- Lazy loading of components
- Optimized production builds
- CDN-ready (can add CloudFront)

## Future Enhancements

- [ ] Translation history with local storage
- [ ] Text-to-speech functionality
- [ ] Document translation (PDF, DOCX)
- [ ] User authentication with Cognito
- [ ] Save favorites and common phrases
- [ ] Dark mode theme
- [ ] Offline support with service workers
- [ ] Multi-language UI
- [ ] Export translations

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available for educational purposes.

## Support

For issues or questions:
- Check [deployment-guide.md](deployment-guide.md) for detailed instructions
- Review AWS documentation for service-specific issues
- Open an issue on GitHub

## Acknowledgments

- Built with React and TypeScript
- Powered by AWS Lambda and Amazon Translate
- Icons by Lucide React
- Styled with Tailwind CSS

## Author

Created as a demonstration of modern serverless architecture and AWS cloud services integration.

---

**Note**: Remember to replace the Lambda Function URL in `src/config.ts` with your actual Lambda Function URL before deploying to production.
