'use client';

import ContactForm from '@/components/contact-form/ContactForm';
import {Modal} from '@mantine/core';
import {useState} from 'react';

interface ContactModalProps {
  opened: boolean;
  productId?: number;
  onClose: () => void;
}

const ContactModal = ({opened, productId, onClose}: ContactModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    onClose();
    setIsSubmitted(false);
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Отправить заявку'
      size={'xl'}
      centered
      styles={{
        body: {padding: 0},
        title: {
          color: '#2A3F87',
          fontSize: '24px',
          fontWeight: 600,
          textTransform: 'uppercase',
          paddingTop: '8px',
          paddingLeft: '8px',
        },
      }}
    >
      <ContactForm setIsSubmitted={setIsSubmitted} productId={productId} />
    </Modal>
  );
};

export default ContactModal;
