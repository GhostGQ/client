'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({value, onChange}: Props) {
  const modules = {
    toolbar: [
      [{header: [1, 2, 3, false]}],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{list: 'ordered'}, {list: 'bullet'}],
      ['clean'],
    ],
  };

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={onChange}
      modules={modules}
      style={{
        background: '#fff',
        color: '#000',
        borderRadius: 10,
        minHeight: '300px',
      }}
    />
  );
}
