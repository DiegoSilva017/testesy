import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

export default function Home() {
  const [data, setData] = useState<any | null>(null);

  const arqv = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          const xml = e.target.result;
          const parser = new XMLParser();
          const jsonResul = parser.parse(xml);
          setData(jsonResul);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xml" onChange={arqv} />*
      <pre>
        {data ? JSON.stringify(data, null, 2) : 'Nenhum dado carregado'}
      </pre>
    </div>
  );
}
