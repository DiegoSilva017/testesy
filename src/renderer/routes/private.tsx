import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

export default function Privar({ children }) {
  const [logado, setLogado] = useState(true);
  const [sinet, setSinet] = useState(false);

  useEffect(() => {
    async function checar() {
      const token = String(localStorage.getItem('token'));
      const tokenv = token ? token.replace(/^"|"$/g, '') : '';
      console.log(token);

      if (!tokenv || tokenv === 'null') {
        setLogado(false);
        setSinet(false);
      }

      try {
        const response = await axios.get(
          `https://erp-system-448717.rj.r.appspot.com/verify?token=${tokenv}`,
        );
        console.log(response.data.msg);
        if (response.data.msg === 'Successfully activated') {
          setLogado(false);
          setSinet(true);
        } else {
          setLogado(false);
          setSinet(false);
        }
      } catch (erro) {
        console.error('error ao verificar token');
        setLogado(false);
        setSinet(false);
      }
    }

    checar();
  }, []);

  if (logado) {
    return <div>Carregando........</div>;
  }
  if (!sinet) {
    return <Navigate to="/" />;
  }

  return children;
}
