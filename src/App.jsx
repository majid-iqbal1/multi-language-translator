import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

const languages = [
  { value: 'auto', label: 'Auto-Detect' },
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
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [copied, setCopied] = useState('');
  const [history, setHistory] = useState([]);

  const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

  const getCachedTranslation = (source, target, text) => {
    const cacheKey = `${source}_${target}_${text}`;
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    try {
      const { translation, timestamp } = JSON.parse(cached);
      const now = Date.now();
      const cacheDuration = 24 * 60 * 60 * 1000;

      if (now - timestamp > cacheDuration) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return translation;
    } catch (error) {
      console.error('Error parsing cached translation:', error);
      localStorage.removeItem(cacheKey);
      return null;
    }
  };

  const setCachedTranslation = (source, target, text, translation) => {
    const cacheKey = `${source}_${target}_${text}`;
    const cacheValue = JSON.stringify({ translation, timestamp: Date.now() });
    localStorage.setItem(cacheKey, cacheValue);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleLoadHistory = (entry) => {
    setText(entry.sourceText);
    setSourceLanguage(entry.sourceLanguage);
    const targetLangOptions = languages.filter(l => entry.targetLanguages.includes(l.value));
    setSelectedLangs(targetLangOptions);
    setTranslations(entry.translatedTexts);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your translation history?')) {
      setHistory([]);
    }
  };

  const handleSpeak = (text, lang) => {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text-to-speech.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        const matchedVoice = updatedVoices.find(voice => voice.lang.startsWith(lang));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        } else {
          alert(`No voice available for language: ${lang}`);
        }
        window.speechSynthesis.speak(utterance);
      };
    } else {
      const matchedVoice = voices.find(voice => voice.lang.startsWith(lang));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      } else {
        alert(`No voice available for language: ${lang}`);
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTranslate = async () => {
    if (!text || selectedLangs.length === 0) return;
    setIsLoading(true);
    const results = {};

    try {
      let detectedLanguage = sourceLanguage;

      if (sourceLanguage === 'auto') {
        const detectResponse = await fetch('https://libretranslate.de/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: text })
        });

        if (!detectResponse.ok) {
          throw new Error('Language detection failed');
        }

        const detectData = await detectResponse.json();
        if (detectData && detectData.length > 0) {
          detectedLanguage = detectData[0].language;
          setSourceLanguage(detectedLanguage);
        } else {
          alert('Could not detect the language. Please select the source language manually.');
          throw new Error('Could not detect language');
        }
      }

      const translationPromises = selectedLangs.map(async (lang) => {
        const cached = getCachedTranslation(detectedLanguage, lang.value, text);
        if (cached) {
          return { lang: lang.value, translation: cached, fromCache: true };
        }

        const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", detectedLanguage);
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

        if (!response.ok) {
          throw new Error(`Failed to translate to ${lang.label}`);
        }

        const data = await response.json();
        const translatedText = data.data.translatedText;

        setCachedTranslation(detectedLanguage, lang.value, text, translatedText);
        return { lang: lang.value, translation: translatedText, fromCache: false };
      });

      const resultsArray = await Promise.all(translationPromises);
      resultsArray.forEach(({ lang, translation }) => {
        results[lang] = translation;
      });

      setTranslations(results);

      const newHistoryEntry = {
        id: Date.now(),
        sourceText: text,
        sourceLanguage: detectedLanguage,
        targetLanguages: selectedLangs.map(lang => lang.value),
        translatedTexts: results,
        timestamp: new Date().toLocaleString()
      };
      setHistory([newHistoryEntry, ...history]);
    } catch (error) {
      console.error('Translation failed:', error);
      alert('An error occurred while translating. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Multi-Language Translator</h1>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto pt-24 px-4 pb-12 w-full">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Language</label>
            <Select
              value={languages.find(l => l.value === sourceLanguage)}
              onChange={(option) => setSourceLanguage(option.value)}
              options={languages}
              className="mb-4"
              classNamePrefix="react-select"
              isSearchable
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border rounded-lg h-32 bg-white text-black focus:ring-2 focus:ring-blue-500 resize-none"
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
              classNamePrefix="react-select"
              isSearchable
            />

            <button
              onClick={handleTranslate}
              disabled={!text || selectedLangs.length === 0 || isLoading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium 
                         hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition duration-200 flex items-center justify-center"
            >
              {isLoading ? 
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Translating...
                </>
                : 
                'Translate'
              }
            </button>
          </div>

          {Object.entries(translations).length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-black">Translations</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(translations).map(([lang, translation]) => (
                  <div key={lang} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-black">
                        {languages.find(l => l.value === lang)?.label}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCopy(translation)}
                          className={`px-3 py-1 rounded text-sm transition-colors
                            ${copied === translation ? 
                              'bg-green-100 text-green-800' : 
                              'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                        >
                          {copied === translation ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                          onClick={() => handleSpeak(translation, lang)}
                          className="px-3 py-1 rounded text-sm bg-green-50 text-green-600 hover:bg-green-100 transition"
                        >
                          Speak
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 break-words">{translation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">Translation History</h2>
                <button
                  onClick={handleClearHistory}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition"
                >
                  Clear History
                </button>
              </div>
              <div className="space-y-4">
                {history.map(entry => (
                  <div key={entry.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-sm text-gray-500">Translated on {entry.timestamp}</p>
                        <h3 className="font-medium text-black">{entry.sourceLanguage.toUpperCase()}</h3>
                      </div>
                      <button
                        onClick={() => handleLoadHistory(entry)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100 transition"
                      >
                        Load
                      </button>
                    </div>
                    <p className="text-gray-800 break-words mb-2"><strong>Source:</strong> {entry.sourceText}</p>
                    <div>
                      <strong>Translations:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {Object.entries(entry.translatedTexts).map(([lang, translation]) => (
                          <li key={lang}>
                            <span className="font-medium">{languages.find(l => l.value === lang)?.label}:</span> {translation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-gray-600">
          © 2025 Bridging Languages with Multi Language Translator, Developed by Majid
        </div>
      </footer>
    </div>
  );
}

export default App;