// PersianTTS.jsx
import React, { useState, useEffect } from 'react';

const PersianTTS = ({ text }) => {
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceSelect, setShowVoiceSelect] = useState(false);

  // Load available voices when component mounts
  useEffect(() => {
    if (!window.speechSynthesis) {
      return;
    }

    // Get all available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Filter for Persian, Arabic, or Urdu voices
      const persianRelatedVoices = voices.filter(voice => 
        voice.lang.includes('fa') || voice.lang.includes('ar') || voice.lang.includes('ur')
      );
      
      setAvailableVoices(persianRelatedVoices.length > 0 ? persianRelatedVoices : voices);
      
      // Set default voice (prefer Persian if available)
      if (persianRelatedVoices.length > 0) {
        const persianVoice = persianRelatedVoices.find(voice => voice.lang.includes('fa'));
        setSelectedVoice(persianVoice || persianRelatedVoices[0]);
      } else if (voices.length > 0) {
        setSelectedVoice(voices[0]);
      }
    };

    // Chrome requires waiting for voices to load
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }, []);

  const speak = () => {
    if (!text || !selectedVoice) return;
    
    try {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      
      // Set other properties
      utterance.rate = 0.9; // Slightly slower for better clarity
      utterance.pitch = 1;
      
      // Track when speech starts and ends
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed to play audio:', err);
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={speak}
        disabled={isPlaying || !selectedVoice}
        className="px-3 py-1 rounded text-sm bg-green-50 text-green-600 hover:bg-green-100 transition"
      >
        {isPlaying ? 'Speaking...' : 'Speak'}
      </button>
      
      {availableVoices.length > 0 && (
        <button 
          onClick={() => setShowVoiceSelect(!showVoiceSelect)}
          className="ml-1 px-2 py-1 rounded text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
        >
          ⚙️
        </button>
      )}
      
      {showVoiceSelect && (
        <div className="absolute right-0 mt-1 bg-white shadow-md rounded p-2 z-10 w-48">
          <p className="text-xs text-gray-500 mb-1">Select voice:</p>
          <select 
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={(e) => {
              const voice = availableVoices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
            className="text-sm w-full p-1 border rounded"
          >
            {availableVoices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Using {selectedVoice?.lang.includes('fa') ? 'Persian' : 
                   selectedVoice?.lang.includes('ar') ? 'Arabic' : 
                   selectedVoice?.lang.includes('ur') ? 'Urdu' : 'default'} voice
          </p>
        </div>
      )}
    </div>
  );
};

export default PersianTTS;