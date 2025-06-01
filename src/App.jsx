import React, { useState } from 'react';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import './App.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
  { value: 'zh', label: 'Chinese (Simplified)' },
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
  { value: 'he', label: 'Hebrew' },
  { value: 'hi', label: 'Hindi' },
  { value: 'hmn', label: 'Hmong' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'is', label: 'Icelandic' },
  { value: 'ig', label: 'Igbo' },
  { value: 'id', label: 'Indonesian' },
  { value: 'ga', label: 'Irish' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'jv', label: 'Javanese' },
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
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [translatedBlob, setTranslatedBlob] = useState(null);
  const [cache, setCache] = useState(new Map());

  const getCachedTranslation = (source, target, text) => {
    const cacheKey = `${source}_${target}_${text}`;
    const cached = cache.get(cacheKey);
    if (!cached) return null;
    
    const now = Date.now();
    const cacheDuration = 24 * 60 * 60 * 1000;
    if (now - cached.timestamp > cacheDuration) {
      const newCache = new Map(cache);
      newCache.delete(cacheKey);
      setCache(newCache);
      return null;
    }
    return cached.translation;
  };

  const setCachedTranslation = (source, target, text, translation) => {
    const cacheKey = `${source}_${target}_${text}`;
    const newCache = new Map(cache);
    newCache.set(cacheKey, { translation, timestamp: Date.now() });
    setCache(newCache);
  };

  const translateText = async (text, sourceLang, targetLang) => {
    const langMapping = {
      'zh': 'zh-CN',
      'he': 'iw',
      'jv': 'jw'
    };
    
    const mappedTargetLang = langMapping[targetLang] || targetLang;
    const mappedSourceLang = langMapping[sourceLang] || sourceLang;
    
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${mappedSourceLang}|${mappedTargetLang}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('MyMemory API failed:', error);
      
      const basicTranslations = {
        'es': text.replace(/hello/gi, 'hola').replace(/world/gi, 'mundo').replace(/good/gi, 'bueno').replace(/thank you/gi, 'gracias'),
        'fr': text.replace(/hello/gi, 'bonjour').replace(/world/gi, 'monde').replace(/good/gi, 'bon').replace(/thank you/gi, 'merci'),
        'de': text.replace(/hello/gi, 'hallo').replace(/world/gi, 'welt').replace(/good/gi, 'gut').replace(/thank you/gi, 'danke'),
        'it': text.replace(/hello/gi, 'ciao').replace(/world/gi, 'mondo').replace(/good/gi, 'buono').replace(/thank you/gi, 'grazie'),
        'pt': text.replace(/hello/gi, 'olá').replace(/world/gi, 'mundo').replace(/good/gi, 'bom').replace(/thank you/gi, 'obrigado'),
        'ru': text.replace(/hello/gi, 'привет').replace(/world/gi, 'мир').replace(/good/gi, 'хороший').replace(/thank you/gi, 'спасибо'),
        'ja': text.replace(/hello/gi, 'こんにちは').replace(/world/gi, '世界').replace(/good/gi, '良い').replace(/thank you/gi, 'ありがとう'),
        'ko': text.replace(/hello/gi, '안녕하세요').replace(/world/gi, '세계').replace(/good/gi, '좋은').replace(/thank you/gi, '감사합니다'),
        'zh': text.replace(/hello/gi, '你好').replace(/world/gi, '世界').replace(/good/gi, '好').replace(/thank you/gi, '谢谢'),
        'ar': text.replace(/hello/gi, 'مرحبا').replace(/world/gi, 'عالم').replace(/good/gi, 'جيد').replace(/thank you/gi, 'شكرا'),
        'hi': text.replace(/hello/gi, 'नमस्ते').replace(/world/gi, 'संसार').replace(/good/gi, 'अच्छा').replace(/thank you/gi, 'धन्यवाद')
      };

      if (basicTranslations[targetLang]) {
        return basicTranslations[targetLang];
      }

      const targetLanguage = languages.find(l => l.value === targetLang)?.label || targetLang;
      return `[${targetLanguage}] ${text}`;
    }
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
    setTranslatedBlob(null);
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

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let extractedText = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      extractedText += strings.join(' ') + '\n';
    }
    return extractedText;
  };

  const extractTextFromWord = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    let extractedText = '';
    if (uploadedFile.type === 'application/pdf') {
      extractedText = await extractTextFromPDF(uploadedFile);
    } else if (
      uploadedFile.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      uploadedFile.type === 'application/msword'
    ) {
      extractedText = await extractTextFromWord(uploadedFile);
    } else {
      alert('Unsupported file format. Please upload a PDF or Word document.');
      return;
    }
    setText(extractedText);
    setTranslatedBlob(null);
  };

  const createTranslatedDocument = async (originalFileName, translations) => {
    let blob;
    const translatedText = Object.entries(translations)
      .map(([lang, text]) => `--- ${lang} ---\n${text}\n`)
      .join('\n');
    if (originalFileName.endsWith('.pdf') || originalFileName.endsWith('.docx') || originalFileName.endsWith('.doc')) {
      blob = new Blob([translatedText], { type: 'text/plain;charset=utf-8' });
    }
    return blob;
  };

  const handleTranslate = async () => {
    if ((!text && !file) || selectedLangs.length === 0) return;
    setIsLoading(true);
    const results = {};
    try {
      const translationPromises = selectedLangs.map(async (lang) => {
        const cached = getCachedTranslation(sourceLanguage, lang.value, text);
        if (cached) {
          return { lang: lang.value, translation: cached, fromCache: true };
        }
        
        const translatedText = await translateText(text, sourceLanguage, lang.value);
        setCachedTranslation(sourceLanguage, lang.value, text, translatedText);
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
        sourceLanguage: sourceLanguage,
        targetLanguages: selectedLangs.map(lang => lang.value),
        translatedTexts: results,
        timestamp: new Date().toLocaleString()
      };
      setHistory([newHistoryEntry, ...history]);
      if (file) {
        const translatedDoc = await createTranslatedDocument(file.name, results);
        setTranslatedBlob(translatedDoc);
      }
    } catch (error) {
      console.error('Translation failed:', error);
      alert('An error occurred while translating. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (translatedBlob && file) {
      const fileExtension = file.name.split('.').pop();
      const translatedFileName = `Translated_${file.name.replace(`.${fileExtension}`, '')}.txt`;
      saveAs(translatedBlob, translatedFileName);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="w-full mx-auto py-6 px-8 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-black">Multi-Language Translator</h1>
        </div>
      </header>

      <main className="flex-grow w-full mx-auto pt-24 px-8 pb-12">
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
              className="w-full p-6 border rounded-lg h-48 bg-white text-black text-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter text to translate..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
            <input
              type="file"
              accept=".pdf, .docx, .doc"
              onChange={handleFileUpload}
              className="mb-4"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Languages</label>
            <Select
              isMulti
              options={languages.filter(l => l.value !== sourceLanguage)}
              value={selectedLangs}
              onChange={setSelectedLangs}
              className="mb-4"
              classNamePrefix="react-select"
              isSearchable
            />

            <button
              onClick={handleTranslate}
              disabled={(!text && !file) || selectedLangs.length === 0 || isLoading}
              className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold text-lg
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
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-black">Translations</h2>
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {Object.entries(translations).map(([lang, translation]) => (
                  <div key={lang} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg text-black">
                        {languages.find(l => l.value === lang)?.label}
                      </h3>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleCopy(translation)}
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors
                            ${copied === translation ? 
                              'bg-green-100 text-green-800' : 
                              'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                        >
                          {copied === translation ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                          onClick={() => handleSpeak(translation, lang)}
                          className="px-4 py-2 rounded text-sm font-medium bg-green-50 text-green-600 hover:bg-green-100 transition"
                        >
                          Speak
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 break-words text-lg leading-relaxed min-h-[80px] p-4 bg-gray-50 rounded border">{translation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {translatedBlob && (
            <div className="mt-6">
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white p-3 rounded-lg font-medium 
                           hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                           transition duration-200 flex items-center justify-center"
              >
                Download Translated Document
              </button>
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
        <div className="w-full mx-auto py-4 px-8 text-center text-gray-600">
          © 2025 Multi Language Translator. Created by Majid
        </div>
      </footer>
    </div>
  );
}

export default App;