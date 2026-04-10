import React from 'react';
import { Languages } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Languages className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">AWS Text Translator Pro</h1>
              <p className="text-sm text-blue-100">Powered by Amazon Translate</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
