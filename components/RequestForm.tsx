import { useState } from 'react';

export default function RequestForm({ productId }: { productId?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, comment, product_id: productId }),
    });
    if (res.ok) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <p>Спасибо! Ваша заявка отправлена ✅</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: 400 }}>
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <textarea
        placeholder="Комментарий (необязательно)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Оставить заявку</button>
    </form>
  );
}
