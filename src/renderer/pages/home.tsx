import { useState } from 'react';
import './hm.css';

export default function Home() {
  const [xml, setXml] = useState<string | null>(null);

  const arqv = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setXml(text);
      };
      console.log(xml);
      reader.readAsText(file);
    } else {
      alert('Por favor, selecione um arquivo XML válido.');
    }
  };

  return (
    <div className="container">
      <input type="file" accept=".xml" onChange={arqv} className="mb-4" />
      {xml && <textarea value={xml} readOnly rows={10} className="area" />}
    </div>
  );
}
