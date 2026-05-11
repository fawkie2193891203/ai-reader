import React, { useState } from 'react';

export default function AIReader() {
  const [text, setText] = useState('Wklej tutaj swój tekst i kliknij czytaj. Możesz wybrać głos i tempo czytania.');
  const [isReading, setIsReading] = useState(false);
  const [voice, setVoice] = useState('pl');
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);

  React.useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  const handleRead = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    const selectedVoice = voices.find(v => 
      (voice === 'pl' && v.lang.startsWith('pl')) ||
      (voice === 'en' && v.lang.startsWith('en'))
    );
    
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;

    utterance.onend = () => setIsReading(false);
    synth.speak(utterance);
    setIsReading(true);
  };

  const canRead = text.trim().length > 0 && text.length <= 5000;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>AI Reader</h1>
      <p>Wklej tekst i słuchaj za 2-3 sekundy</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '16px', marginBottom: '1.5rem' }}>
        <div>
          <label>Wklej tekst (max 5000)</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 5000))}
            style={{ width: '100%', minHeight: '280px', padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
          <div style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>
            {text.length} / 5000 znaków
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label>Głos</label>
            <select value={voice} onChange={(e) => setVoice(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
              <option value="pl">🇵🇱 Polski</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>

          <div>
            <label>Tempo</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} style={{ flex: 1 }} />
              <span>{rate.toFixed(1)}x</span>
            </div>
          </div>

          <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#f0f0f0', textAlign: 'center', fontSize: '12px' }}>
            {isReading ? '🔴 Czytam...' : '🟢 Gotowe'}
          </div>
        </div>
      </div>

      <button onClick={handleRead} disabled={!canRead} style={{ padding: '12px 24px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: isReading ? '#ff6b6b' : '#fff', color: isReading ? '#fff' : '#000', cursor: canRead ? 'pointer' : 'not-allowed' }}>
        {isReading ? '⏹ Stop' : '▶ Czytaj'}
      </button>
    </div>
  );
}
