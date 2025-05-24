import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RequestForm from '@/components/RequestForm';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/products/slug/${slug}`)
        .then(res => res.json())
        .then(data => setProduct(data.product));
    }
  }, [slug]);

  if (!product) return <p>Загрузка...</p>;

  return (
    <div style={{ padding: 32 }}>
      <h1>{product.title_ru}</h1>
      <img src={product.img} alt={product.title_ru} style={{ maxWidth: 400 }} />
      <p>{product.description_ru}</p>

      <h3 style={{ marginTop: 32 }}>Оставить заявку:</h3>
      <RequestForm productId={product.id} />
    </div>
  );
}
