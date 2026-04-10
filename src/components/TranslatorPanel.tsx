import React, { useState } from 'react';
import { ArrowLeftRight, Languages as TranslateIcon } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TextInput from './TextInput';
import TranslationOutput from './TranslationOutput';
import ErrorMessage from './ErrorMessage';
import { translateText } from '../utils/translationService';
import { getSourceLanguages, getTargetLanguages, getLanguageName } from '../utils/languageUtils';

export default function TranslatorPanel() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('hi');
  const [detectedLang, setDetectedLang] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter some text to translate.');
      return;
    }

    if (sourceLang === targetLang && sourceLang !== 'auto') {
      setError('Source and target languages cannot be the same.');
      return;
    }

    setError('');
    setIsLoading(true);
    setTranslatedText('');
    setDetectedLang('');

    try {
      const result = await translateText(sourceText, sourceLang, targetLang);
      setTranslatedText(result.translatedText);
      
      if (sourceLang === 'auto' && result.sourceLanguage) {
        setDetectedLang(getLanguageName(result.sourceLanguage));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') return;

    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    if (translatedText) {
      const tempText = sourceText;
      setSourceText(translatedText);
      setTranslatedText(tempText);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
      {/* Language Selection */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <LanguageSelector
            label="From"
            value={sourceLang}
            onChange={setSourceLang}
            languages={getSourceLanguages()}
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleSwapLanguages}
          disabled={sourceLang === 'auto' || isLoading}
          className="mt-6 p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Swap languages"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <LanguageSelector
            label="To"
            value={targetLang}
            onChange={setTargetLang}
            languages={getTargetLanguages()}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid md:grid-cols-2 gap-6 min-h-[300px]">
        <TextInput
          value={sourceText}
          onChange={setSourceText}
          disabled={isLoading}
        />
        <TranslationOutput
          text={translatedText}
          detectedLanguage={detectedLang}
          isLoading={isLoading}
        />
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      {/* Translate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleTranslate}
          disabled={isLoading || !sourceText.trim()}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <TranslateIcon className="w-5 h-5" />
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </div>
  );
}
