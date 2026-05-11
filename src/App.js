export default function AIReader() {
  const [text, setText] = React.useState('Wklej tutaj swój tekst i kliknij czytaj');
  const [isReading, setIsReading] = React.useState(false);
  const [voice, setVoice] = React.useState('pl');
  const [rate, setRate] = React.useState(1);

  const handleRead = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.onend = () => setIsReading(false);
    synth.speak(utterance);
    setIsReading(true);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>AI Reader</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '16px', marginBottom: '1.5rem' }}>
        <textarea value={text} onChange={(e) => setText(e.target.value.slice(0, 5000))} style={{ minHeight: '280px', padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '8px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <select value={voice} onChange={(e) => setVoice(e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
            <option value="pl">🇵🇱 Polski</option>
            <option value="en">🇬🇧 English</option>
          </select>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '6px' }}>
            {isReading ? '🔴 Czytam...' : '🟢 Gotowe'}
          </div>
        </div>
      </div>
      <button onClick={handleRead} style={{ padding: '12px 24px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', backgroundColor: isReading ? '#ff6b6b' : '#fff', color: isReading ? '#fff' : '#000' }}>
        {isReading ? '⏹ Stop' : '▶ Czytaj'}
      </button>
    </div>
  );
}
