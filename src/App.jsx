import { useState } from 'react'

  const languages = [
    { id: 'es', label: 'Spanish' },
    { id: 'fr', label: 'French' },
    { id: 'de', label: 'German' },
    { id: 'it', label: 'Italian' },
    { id: 'pt', label: 'Portuguese' },
    { id: 'ru', label: 'Russian' },
    { id: 'ja', label: 'Japanese' },
    { id: 'ko', label: 'Korean' },
    { id: 'hi', label: 'Hindi' },
    { id: 'ar', label: 'Arabic' },
    { id: 'nl', label: 'Dutch' },
    { id: 'pl', label: 'Polish' },
    { id: 'vi', label: 'Vietnamese' },
    { id: 'zh-TW', label: 'Traditional Chinese' },
    { id: 'rw', label: 'Kinyarwanda' },
    { id: 'so', label: 'Somali' },
    { id: 'sw', label: 'Swahili' },
    { id: 'my', label: 'Burmese' },
    { id: 'uk', label: 'Ukrainian' }
   ]

function App() {
 const [text, setText] = useState('')
 const [selectedLangs, setSelectedLangs] = useState([])
 const [translations, setTranslations] = useState({})

 const handleTranslate = async () => {
   const results = {}
   const API_KEY = 'REMOVED'

   for (const lang of selectedLangs) {
     try {
       const encodedParams = new URLSearchParams()
       encodedParams.append("source_language", "en")
       encodedParams.append("target_language", lang)
       encodedParams.append("text", text)

       const response = await fetch('https://text-translator2.p.rapidapi.com/translate', {
         method: 'POST',
         headers: {
           'content-type': 'application/x-www-form-urlencoded',
           'X-RapidAPI-Key': API_KEY,
           'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
         },
         body: encodedParams
       })
       const data = await response.json()
       results[lang] = data.data.translatedText
     } catch (error) {
       results[lang] = 'Translation failed'
     }
   }
   setTranslations(results)
 }

 return (
   <div className="min-h-screen bg-gray-100">
     {/* Header */}
     <header className="bg-white shadow">
       <div className="max-w-7xl mx-auto py-6 px-4">
         <h1 className="text-3xl font-bold text-black">Multi-Language Translator</h1>
       </div>
     </header>

     {/* Main Content */}
     <main className="max-w-7xl mx-auto py-6 px-4">
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

         {/* Language Selection */}
         <div className="mb-8">
           <h2 className="text-xl font-semibold mb-4 text-black">Select Languages</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {languages.map((lang) => (
               <label key={lang.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 bg-white text-black">
                 <input
                   type="checkbox"
                   checked={selectedLangs.includes(lang.id)}
                   onChange={(e) => {
                     setSelectedLangs(e.target.checked 
                       ? [...selectedLangs, lang.id]
                       : selectedLangs.filter(id => id !== lang.id)
                     )
                   }}
                   className="rounded text-blue-600"
                 />
                 <span>{lang.label}</span>
               </label>
             ))}
           </div>
         </div>

         {/* Translate Button */}
         <button 
           onClick={handleTranslate}
           disabled={!text || selectedLangs.length === 0}
           className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium
                      hover:bg-blue-700 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-blue-500 
                      disabled:opacity-50 disabled:cursor-not-allowed"
         >
           Translate
         </button>

         {/* Translations */}
         {Object.entries(translations).length > 0 && (
           <div className="mt-8">
             <h2 className="text-xl font-semibold mb-4 text-black">Translations</h2>
             <div className="grid gap-4 md:grid-cols-2">
               {Object.entries(translations).map(([lang, translation]) => (
                 <div key={lang} className="bg-white text-black p-4 rounded-lg border">
                   <h3 className="font-medium text-lg mb-2 text-black">
                     {languages.find(l => l.id === lang)?.label}
                   </h3>
                   <p className="text-black">{translation}</p>
                 </div>
               ))}
             </div>
           </div>
         )}
       </div>
     </main>

     {/* Footer */}
     <footer className="bg-white shadow mt-8">
       <div className="max-w-7xl mx-auto py-4 px-4 text-center text-black">
         Created with React & Tailwind CSS
       </div>
     </footer>
   </div>
 )
}

export default App