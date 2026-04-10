import json
import boto3

def lambda_handler(event, context):
    """
    AWS Lambda function to translate text using Amazon Translate service.
    This function is invoked via Lambda Function URL from the frontend.
    """
    
    # Add CORS headers for browser requests
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
    
    # Handle preflight OPTIONS request
    if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight successful'})
        }
    
    # Parse the input from the event
    try:
        body = json.loads(event['body'])
        text = body['text']
        source_lang = body.get('source_lang', 'auto')
        target_lang = body['target_lang']
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Invalid input format'})
        }
    
    # Initialize the Translate client
    translate = boto3.client('translate')
    
    try:
        # Perform the translation
        response = translate.translate_text(
            Text=text,
            SourceLanguageCode=source_lang,
            TargetLanguageCode=target_lang
        )
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'translatedText': response['TranslatedText'],
                'sourceLanguage': response['SourceLanguageCode']
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
