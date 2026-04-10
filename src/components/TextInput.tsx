import React from 'react';
import { MAX_CHARS } from '../config';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder = 'Enter text to translate...',
  disabled = false,
}: TextInputProps) {
  const charCount = value.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Source Text
        </label>
        <span
          className={`text-sm font-medium ${
            isNearLimit ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {charCount}/{MAX_CHARS}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={MAX_CHARS}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
      />
    </div>
  );
}
