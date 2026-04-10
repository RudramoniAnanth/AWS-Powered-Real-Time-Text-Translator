import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  languages: Language[];
  disabled?: boolean;
}

export default function LanguageSelector({
  label,
  value,
  onChange,
  languages,
  disabled = false,
}: LanguageSelectorProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
