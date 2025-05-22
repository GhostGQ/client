import { useState } from 'react';

export default function TestPage() {
  const [val, setVal] = useState('');
  const [out, setOut] = useState('');

  const handleClick = () => {
    console.log('🔥 Кнопка сработала');
    setOut(val);
  };

  return (
    <div style={{ padding: '100px' }}>
      <input value={val} onChange={(e) => setVal(e.target.value)} />
      <button onClick={handleClick}>Проверка</button>
      <p>Результат: {out}</p>
    </div>
  );
}
