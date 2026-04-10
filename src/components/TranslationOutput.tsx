import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface TranslationOutputProps {
  text: string;
  detectedLanguage?: string;
  isLoading?: boolean;
}

export default function TranslationOutput({
  text,
  detectedLanguage,
  isLoading = false,
}: TranslationOutputProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Translation
        </label>
        {detectedLanguage && (
          <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Detected: {detectedLanguage}
          </span>
        )}
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">Translating...</p>
              </div>
            </div>
          ) : text ? (
            <p className="text-gray-900 whitespace-pre-wrap">{text}</p>
          ) : (
            <p className="text-gray-400 italic">Translation will appear here...</p>
          )}
        </div>
        {text && !isLoading && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            title="Copy to clipboard"
          >
            {copied ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
