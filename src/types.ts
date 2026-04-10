export interface TranslationRequest {
  text: string;
  source_lang: string;
  target_lang: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
}

export interface ErrorResponse {
  error: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface TranslationHistory {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: number;
}
