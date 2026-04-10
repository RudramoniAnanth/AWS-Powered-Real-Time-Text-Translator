import { LAMBDA_URL } from '../config';
import { TranslationRequest, TranslationResponse, ErrorResponse } from '../types';

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResponse> {
  const payload: TranslationRequest = {
    text,
    source_lang: sourceLang,
    target_lang: targetLang,
  };

  const response = await fetch(LAMBDA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.error || 'Translation failed');
  }

  const data: TranslationResponse = await response.json();
  return data;
}
