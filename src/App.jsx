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

  const handleTranslate = async () => {
    const results = {};
    const API_KEY = 'REMOVED';

    for (const lang of selectedLangs) {
      try {
        const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", "en");
        encodedParams.append("target_language", lang.value);
        encodedParams.append("text", text);

        const response = await fetch('https://text-translator2.p.rapidapi.com/translate', {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
          },
          body: encodedParams
        });
        const data = await response.json();
        results[lang.value] = data.data.translatedText;
      } catch (error) {
        results[lang.value] = 'Translation failed';
      }
    }
    setTranslations(results);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow w-full">
        <div className="w-full py-6 px-4">
          <h1 className="text-3xl font-bold text-black">Multi-Language Translator</h1>
        </div>
      </header>

      <main className="w-full py-6 px-4">
        <div className="bg-white shadow rounded-lg p-6">
          {/* Input Section */}
          <div className="mb-8">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border rounded-lg h-32 bg-white text-black focus:ring-2 focus:ring-blue-500"
              placeholder="Enter English text..."
            />
          </div>

          {/* Language Selection Form */}
          <div className="mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTranslate();
              }}
            >
              <label htmlFor="language-select" className="block text-xl font-semibold mb-2 text-black">
                Select Languages
              </label>
              <Select
                id="language-select"
                isMulti
                options={languages}
                value={selectedLangs}
                onChange={setSelectedLangs}
                className="mb-4"
                classNamePrefix="select"
                placeholder="Choose languages..."
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#d1d5db', // Tailwind's gray-300
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#a1a1aa', // Tailwind's gray-400
                    },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#bfdbfe', // Tailwind's blue-300
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#1e40af', // Tailwind's blue-800
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: '#1e40af',
                    ':hover': {
                      backgroundColor: '#93c5fd', // Tailwind's blue-400
                      color: '#1e40af',
                    },
                  }),
                }}
              />

              {/* Translate Button */}
              <button
                type="submit"
                disabled={!text || selectedLangs.length === 0}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Translate
              </button>
            </form>
          </div>

          {/* Translations */}
          {Object.entries(translations).length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-black">Translations</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(translations).map(([lang, translation]) => (
                  <div
                    key={lang}
                    className="bg-white text-black p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-lg text-black">
                      {languages.find((l) => l.value === lang)?.label}
                    </h3>
                    <p className="text-black">{translation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white shadow mt-8 w-full">
        <div className="w-full py-4 px-4 text-center text-black">
          Created by Majid
        </div>
      </footer>
    </div>
  );
}

export default App;
