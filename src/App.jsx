import React, { useState } from 'react';
import Select from 'react-select';

const languages = [
  { value: 'af', label: 'Afrikaans' },
  { value: 'sq', label: 'Albanian' },
  { value: 'am', label: 'Amharic' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hy', label: 'Armenian' },
  { value: 'az', label: 'Azerbaijani' },
  { value: 'eu', label: 'Basque' },
  { value: 'be', label: 'Belarusian' },
  { value: 'bn', label: 'Bengali' },
  { value: 'bs', label: 'Bosnian' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'ca', label: 'Catalan' },
  { value: 'ceb', label: 'Cebuano' },
  { value: 'ny', label: 'Chichewa' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'zh-TW', label: 'Chinese (Traditional)' },
  { value: 'co', label: 'Corsican' },
  { value: 'hr', label: 'Croatian' },
  { value: 'cs', label: 'Czech' },
  { value: 'da', label: 'Danish' },
  { value: 'nl', label: 'Dutch' },
  { value: 'en', label: 'English' },
  { value: 'eo', label: 'Esperanto' },
  { value: 'et', label: 'Estonian' },
  { value: 'tl', label: 'Filipino' },
  { value: 'fi', label: 'Finnish' },
  { value: 'fr', label: 'French' },
  { value: 'fy', label: 'Frisian' },
  { value: 'gl', label: 'Galician' },
  { value: 'ka', label: 'Georgian' },
  { value: 'de', label: 'German' },
  { value: 'el', label: 'Greek' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'ht', label: 'Haitian Creole' },
  { value: 'ha', label: 'Hausa' },
  { value: 'haw', label: 'Hawaiian' },
  { value: 'iw', label: 'Hebrew' },
  { value: 'hi', label: 'Hindi' },
  { value: 'hmn', label: 'Hmong' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'is', label: 'Icelandic' },
  { value: 'ig', label: 'Igbo' },
  { value: 'id', label: 'Indonesian' },
  { value: 'ga', label: 'Irish' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'jw', label: 'Javanese' },
  { value: 'kn', label: 'Kannada' },
  { value: 'kk', label: 'Kazakh' },
  { value: 'km', label: 'Khmer' },
  { value: 'ko', label: 'Korean' },
  { value: 'ku', label: 'Kurdish (Kurmanji)' },
  { value: 'ky', label: 'Kyrgyz' },
  { value: 'lo', label: 'Lao' },
  { value: 'la', label: 'Latin' },
  { value: 'lv', label: 'Latvian' },
  { value: 'lt', label: 'Lithuanian' },
  { value: 'lb', label: 'Luxembourgish' },
  { value: 'mk', label: 'Macedonian' },
  { value: 'mg', label: 'Malagasy' },
  { value: 'ms', label: 'Malay' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'mt', label: 'Maltese' },
  { value: 'mi', label: 'Maori' },
  { value: 'mr', label: 'Marathi' },
  { value: 'mn', label: 'Mongolian' },
  { value: 'my', label: 'Myanmar (Burmese)' },
  { value: 'ne', label: 'Nepali' },
  { value: 'no', label: 'Norwegian' },
  { value: 'ps', label: 'Pashto' },
  { value: 'fa', label: 'Persian' },
  { value: 'pl', label: 'Polish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'ro', label: 'Romanian' },
  { value: 'ru', label: 'Russian' },
  { value: 'sm', label: 'Samoan' },
  { value: 'gd', label: 'Scots Gaelic' },
  { value: 'sr', label: 'Serbian' },
  { value: 'st', label: 'Sesotho' },
  { value: 'sn', label: 'Shona' },
  { value: 'sd', label: 'Sindhi' },
  { value: 'si', label: 'Sinhala' },
  { value: 'sk', label: 'Slovak' },
  { value: 'sl', label: 'Slovenian' },
  { value: 'so', label: 'Somali' },
  { value: 'es', label: 'Spanish' },
  { value: 'su', label: 'Sundanese' },
  { value: 'sw', label: 'Swahili' },
  { value: 'sv', label: 'Swedish' },
  { value: 'tg', label: 'Tajik' },
  { value: 'ta', label: 'Tamil' },
  { value: 'tt', label: 'Tatar' },
  { value: 'te', label: 'Telugu' },
  { value: 'th', label: 'Thai' },
  { value: 'tr', label: 'Turkish' },
  { value: 'tk', label: 'Turkmen' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'ur', label: 'Urdu' },
  { value: 'ug', label: 'Uyghur' },
  { value: 'uz', label: 'Uzbek' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'cy', label: 'Welsh' },
  { value: 'xh', label: 'Xhosa' },
  { value: 'yi', label: 'Yiddish' },
  { value: 'yo', label: 'Yoruba' },
  { value: 'zu', label: 'Zulu' }
];

function App() {
  const [text, setText] = useState('');
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [copied, setCopied] = useState('');
 
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleTranslate = async () => {
    if (!text || selectedLangs.length === 0) return;
    setIsLoading(true);
    const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
  
    try {
      const translationPromises = selectedLangs.map(lang => {
        const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", sourceLanguage);
        encodedParams.append("target_language", lang.value);
        encodedParams.append("text", text);
  
        return fetch('https://text-translator2.p.rapidapi.com/translate', {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
          },
          body: encodedParams
        })
          .then(response => response.json())
          .then(data => ({ lang: lang.value, translation: data.data.translatedText }));
      });
  
      const resultsArray = await Promise.all(translationPromises);
      const results = resultsArray.reduce((acc, curr) => {
        acc[curr.lang] = curr.translation;
        return acc;
      }, {});
  
      setTranslations(results);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-black">Multi-Language Translator</h1>
        </div>
      </header>
 
      <main className="max-w-7xl mx-auto pt-24 px-4 pb-12">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Language</label>
            <Select
              value={languages.find(l => l.value === sourceLanguage)}
              onChange={(option) => setSourceLanguage(option.value)}
              options={languages}
              className="mb-4"
            />
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border rounded-lg h-32 bg-white text-black focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text to translate..."
            />
          </div>
 
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Languages</label>
            <Select
              isMulti
              options={languages.filter(l => l.value !== 'auto')}
              value={selectedLangs}
              onChange={setSelectedLangs}
              className="mb-4"
            />
 
            <button
              onClick={handleTranslate}
              disabled={!text || selectedLangs.length === 0 || isLoading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium 
                         hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition duration-200"
            >
              {isLoading ? 
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Translating...
                </span> : 
                'Translate'
              }
            </button>
          </div>
 
          {Object.entries(translations).length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-black">Translations</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(translations).map(([lang, translation]) => (
                  <div key={lang} 
                       className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-black">
                        {languages.find(l => l.value === lang)?.label}
                      </h3>
                      <button
                        onClick={() => handleCopy(translation)}
                        className={`px-3 py-1 rounded text-sm transition-colors
                          ${copied === translation ? 
                            'bg-green-100 text-green-800' : 
                            'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                      >
                        {copied === translation ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-gray-800 break-words">{translation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
 
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-gray-600">
          Created by Majid
        </div>
      </footer>
    </div>
  );
 }
 
 export default App;