# Lambda Function

AWS Lambda function for text translation using Amazon Translate.

## Files

- `lambda_function.py` - Main Lambda function code
- `s3-bucket-policy.json` - S3 bucket policy for static hosting

## Setup

1. Create Lambda function in AWS Console
2. Copy code from `lambda_function.py`
3. Set runtime to Python 3.12
4. Add IAM policy: `TranslateFullAccess`
5. Create Function URL with CORS enabled

## Configuration

### IAM Policy Required
- `TranslateFullAccess`

### Function URL Settings
- Auth type: NONE
- CORS: Enabled
- Allow origin: `*`
- Allow methods: `POST, OPTIONS`
- Allow headers: `Content-Type`

## Testing

Test event:
```json
{
  "body": "{\"text\": \"Hello\", \"source_lang\": \"auto\", \"target_lang\": \"es\"}"
}
```

Expected response:
```json
{
  "statusCode": 200,
  "headers": {...},
  "body": "{\"translatedText\": \"Hola\", \"sourceLanguage\": \"en\"}"
}
```

## Deployment

See [../docs/deployment-guide.md](../docs/deployment-guide.md) for detailed instructions.
