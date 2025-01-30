import { useState } from 'react';
import './lg.css';
import axios from 'axios';
import { replace, useNavigate } from 'react-router';

export default function Login() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const navegar = useNavigate();

  async function Entra(e) {
    e.preventDefault();
    if (senha === '' && email === '') {
      alert('email ou senha vazio');
      return;
    }
    try {
      const response = await axios.post(
        'https://erp-system-448717.rj.r.appspot.com/login',
        {
          email,
          password: senha,
        },
      );
      const { token } = response.data;
      if (!token) {
        return;
      }

      const tokeresponse = await axios.get(
        `https://erp-system-448717.rj.r.appspot.com/verify?token=${token}`,
      );
      if (tokeresponse.data.msg === 'Successfully activated') {
        localStorage.setItem('token', JSON.stringify(token));
        navegar('/home', { replace: true });
      } else {
        alert('falha ao fazer login');
      }
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={Entra}>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button type="submit">Entra</button>
      </form>
    </div>
  );
}
