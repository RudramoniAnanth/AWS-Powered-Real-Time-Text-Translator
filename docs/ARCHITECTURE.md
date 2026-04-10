# AWS Text Translator Pro - Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         End Users                                │
│                    (Web Browsers)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Amazon S3 Bucket                              │
│              (Static Website Hosting)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  React SPA (Single Page Application)                     │  │
│  │  - index.html                                            │  │
│  │  - JavaScript bundle (React + TypeScript)                │  │
│  │  - CSS bundle (Tailwind)                                 │  │
│  │  - Assets (icons, images)                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Configuration:                                                   │
│  - Static website hosting: Enabled                               │
│  - Index document: index.html                                    │
│  - Public read access: Enabled                                   │
│  - Bucket policy: PublicReadGetObject                            │
└────────────────────────┬────────────────────────────────────────┘
                         │ API Call (POST)
                         │ JSON Payload
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Lambda Function URL                                 │
│         (Public HTTP Endpoint)                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CORS Configuration:                                     │  │
│  │  - Allow Origin: *                                       │  │
│  │  - Allow Methods: POST, OPTIONS                          │  │
│  │  - Allow Headers: Content-Type                           │  │
│  │  - Auth Type: NONE (public access)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AWS Lambda Function                            │
│                  (Serverless Compute)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Runtime: Python 3.12                                    │  │
│  │  Memory: 128 MB                                          │  │
│  │  Timeout: 30 seconds                                     │  │
│  │                                                          │  │
│  │  Function: lambda_handler()                              │  │
│  │  - Parse request body                                    │  │
│  │  - Validate input                                        │  │
│  │  - Call Amazon Translate                                 │  │
│  │  - Format response                                       │  │
│  │  - Handle errors                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  IAM Role:                                                        │
│  - TranslateFullAccess policy                                    │
│  - CloudWatch Logs write access                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │ boto3.client('translate')
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Amazon Translate Service                            │
│           (AI-Powered Translation)                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Neural Machine Translation                              │  │
│  │  - Auto language detection                               │  │
│  │  - 75+ language pairs                                    │  │
│  │  - Real-time translation                                 │  │
│  │  - High accuracy                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│                    (Main Container)                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Header.tsx                            │  │
│  │  - Logo and branding                                     │  │
│  │  - "AWS Text Translator Pro"                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Info Banner                             │  │
│  │  - Service description                                   │  │
│  │  - Usage instructions                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              TranslatorPanel.tsx                         │  │
│  │           (Main Translation Interface)                   │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │  Language Selection Row                            │ │  │
│  │  │  ┌──────────────┐  ┌────┐  ┌──────────────┐      │ │  │
│  │  │  │ Language     │  │Swap│  │ Language     │      │ │  │
│  │  │  │ Selector     │  │Btn │  │ Selector     │      │ │  │
│  │  │  │ (Source)     │  │    │  │ (Target)     │      │ │  │
│  │  │  └──────────────┘  └────┘  └──────────────┘      │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │  Text Areas Row                                    │ │  │
│  │  │  ┌──────────────┐        ┌──────────────┐        │ │  │
│  │  │  │  TextInput   │        │ Translation  │        │ │  │
│  │  │  │  Component   │        │   Output     │        │ │  │
│  │  │  │              │        │  Component   │        │ │  │
│  │  │  │ - Input area │        │ - Result     │        │ │  │
│  │  │  │ - Char count │        │ - Copy btn   │        │ │  │
│  │  │  └──────────────┘        └──────────────┘        │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │  ErrorMessage (conditional)                        │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │  Translate Button                                  │ │  │
│  │  │  - Loading state                                   │ │  │
│  │  │  - Disabled state                                  │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Feature Cards (3 columns)                   │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐                    │  │
│  │  │Lightning│  │  Auto  │  │  16+   │                    │  │
│  │  │  Fast   │  │ Detect │  │Languages│                   │  │
│  │  └────────┘  └────────┘  └────────┘                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Footer.tsx                            │  │
│  │  - Copyright                                             │  │
│  │  - Contact links                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────┐
│   User       │
│   Types      │
│   Text       │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  TextInput.tsx       │
│  - Captures input    │
│  - Updates state     │
│  - Shows char count  │
└──────┬───────────────┘
       │ onChange
       ▼
┌──────────────────────────────┐
│  TranslatorPanel.tsx         │
│  State Management:           │
│  - sourceText                │
│  - translatedText            │
│  - sourceLang                │
│  - targetLang                │
│  - isLoading                 │
│  - error                     │
└──────┬───────────────────────┘
       │ User clicks "Translate"
       ▼
┌──────────────────────────────┐
│  Validation                  │
│  - Check text not empty      │
│  - Check languages different │
│  - Set loading state         │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  translationService.ts       │
│  - Build request payload     │
│  - Call Lambda Function URL  │
│  - Handle response           │
└──────┬───────────────────────┘
       │ HTTP POST
       ▼
┌──────────────────────────────┐
│  Lambda Function URL         │
│  - CORS preflight            │
│  - Route to Lambda           │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  lambda_handler()            │
│  - Parse body                │
│  - Extract parameters        │
│  - Call Translate API        │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Amazon Translate            │
│  - Detect language (if auto) │
│  - Translate text            │
│  - Return result             │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Lambda Response             │
│  {                           │
│    translatedText: "...",    │
│    sourceLanguage: "en"      │
│  }                           │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  translationService.ts       │
│  - Parse response            │
│  - Return typed data         │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  TranslatorPanel.tsx         │
│  - Update translatedText     │
│  - Update detectedLang       │
│  - Clear loading state       │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  TranslationOutput.tsx       │
│  - Display translated text   │
│  - Show detected language    │
│  - Enable copy button        │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────┐
│   User       │
│   Sees       │
│   Result     │
└──────────────┘
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│              TranslatorPanel Component State                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  const [sourceText, setSourceText] = useState('')           │
│  const [translatedText, setTranslatedText] = useState('')   │
│  const [sourceLang, setSourceLang] = useState('auto')       │
│  const [targetLang, setTargetLang] = useState('hi')         │
│  const [detectedLang, setDetectedLang] = useState('')       │
│  const [isLoading, setIsLoading] = useState(false)          │
│  const [error, setError] = useState('')                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ TextInput    │    │ Language     │    │ Translation  │
│ Component    │    │ Selectors    │    │ Output       │
│              │    │              │    │              │
│ Props:       │    │ Props:       │    │ Props:       │
│ - value      │    │ - value      │    │ - text       │
│ - onChange   │    │ - onChange   │    │ - detected   │
│ - disabled   │    │ - languages  │    │ - isLoading  │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Build Process Flow

```
┌──────────────────┐
│  Source Files    │
│  (src/*.tsx)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│  TypeScript Compiler     │
│  - Type checking         │
│  - JSX transformation    │
│  - ES2020 target         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Vite Bundler            │
│  - Module resolution     │
│  - Tree shaking          │
│  - Code splitting        │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Optimization            │
│  - Minification          │
│  - Compression           │
│  - Asset optimization    │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Output (dist/)          │
│  - index.html            │
│  - assets/index-[hash].js│
│  - assets/index-[hash].css│
└──────────────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Deploy to S3            │
│  - Upload files          │
│  - Set content types     │
│  - Enable hosting        │
└──────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (S3)                                               │
│  ├─ Read-only public access                                 │
│  ├─ No write permissions                                    │
│  ├─ Bucket policy restrictions                              │
│  └─ Static content only                                     │
│                                                               │
│  API Layer (Lambda Function URL)                            │
│  ├─ CORS configuration                                      │
│  ├─ Public endpoint (no auth)                               │
│  ├─ Input validation                                        │
│  └─ Rate limiting (AWS managed)                             │
│                                                               │
│  Backend (Lambda)                                            │
│  ├─ Minimal IAM permissions                                 │
│  ├─ Only Translate access                                   │
│  ├─ Input sanitization                                      │
│  ├─ Error message sanitization                              │
│  └─ CloudWatch logging                                      │
│                                                               │
│  Translation Service (Amazon Translate)                     │
│  ├─ AWS managed security                                    │
│  ├─ Encrypted in transit                                    │
│  ├─ No data retention                                       │
│  └─ IAM-based access control                                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Development                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Local Machine                                       │  │
│  │  - npm run dev                                       │  │
│  │  - Vite dev server (port 3000)                       │  │
│  │  - Hot Module Replacement                            │  │
│  │  - Source maps enabled                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ npm run build
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Production Build                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  dist/ Directory                                     │  │
│  │  - Optimized HTML                                    │  │
│  │  - Minified JavaScript                               │  │
│  │  - Minified CSS                                      │  │
│  │  - Hashed filenames                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ Upload
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS S3 Bucket                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static Website Hosting                              │  │
│  │  - index.html                                        │  │
│  │  - assets/                                           │  │
│  │  - Public read access                                │  │
│  │  - Website endpoint enabled                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ Access
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    End Users                                 │
│  - http://bucket-name.s3-website-region.amazonaws.com       │
│  - Fast global access                                        │
│  - High availability                                         │
└─────────────────────────────────────────────────────────────┘
```

## Cost Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Cost Breakdown                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  S3 Storage                                                  │
│  ├─ ~200 KB application size                                │
│  ├─ $0.023 per GB/month                                     │
│  └─ Cost: ~$0.00/month                                      │
│                                                               │
│  S3 Requests                                                 │
│  ├─ GET requests for files                                  │
│  ├─ $0.0004 per 1,000 requests                              │
│  └─ Cost: ~$0.004/month (10K requests)                      │
│                                                               │
│  Lambda Invocations                                          │
│  ├─ 1M free tier requests                                   │
│  ├─ $0.20 per 1M requests after                             │
│  └─ Cost: $0.00/month (within free tier)                    │
│                                                               │
│  Lambda Compute                                              │
│  ├─ 400,000 GB-seconds free tier                            │
│  ├─ $0.0000166667 per GB-second after                       │
│  └─ Cost: $0.00/month (within free tier)                    │
│                                                               │
│  Amazon Translate                                            │
│  ├─ $15 per 1M characters                                   │
│  ├─ No free tier                                            │
│  └─ Cost: ~$1.50/month (100K characters)                    │
│                                                               │
│  Data Transfer                                               │
│  ├─ $0.09 per GB out                                        │
│  ├─ 1 GB free tier                                          │
│  └─ Cost: ~$0.09/month (1 GB)                               │
│                                                               │
│  TOTAL ESTIMATED COST: ~$1.60/month                         │
│  (Low traffic scenario)                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Scalability Architecture

```
Current Setup (Basic)
┌──────────┐
│ S3 Bucket│ ──→ Users (Direct access)
└──────────┘
     │
     ▼
┌──────────┐
│  Lambda  │ ──→ Amazon Translate
└──────────┘

Enhanced Setup (Production)
┌──────────────┐
│  CloudFront  │ ──→ Users (Global CDN)
│     (CDN)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  S3 Bucket   │ (Origin)
└──────────────┘
       │
       ▼
┌──────────────┐
│ API Gateway  │ (Optional rate limiting)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Lambda     │ (Auto-scaling)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Translate  │ (Managed service)
└──────────────┘
```

---

This architecture provides a solid foundation for a scalable, maintainable, and cost-effective translation service using AWS serverless technologies.
