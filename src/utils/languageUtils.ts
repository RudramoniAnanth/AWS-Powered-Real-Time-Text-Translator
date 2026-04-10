import { LANGUAGES } from '../config';

export function getLanguageName(code: string): string {
  const language = LANGUAGES.find((lang) => lang.code === code);
  return language ? language.name : code;
}

export function getSourceLanguages() {
  return LANGUAGES;
}

export function getTargetLanguages() {
  return LANGUAGES.filter((lang) => lang.code !== 'auto');
}
