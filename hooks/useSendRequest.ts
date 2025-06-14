import { useMutation } from '@tanstack/react-query';

interface RequestData {
  name: string;
  phone: string;
  comment: string;
  product_id?: number | null
}

const sendRequest = async (data: RequestData) => {
  const res = await fetch('/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Ошибка при отправке заявки');
  }

  return res.json();
};

export const useSendRequest = () => {
  return useMutation({
    mutationFn: sendRequest,
  });
};
