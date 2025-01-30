import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';
import Privar from './private';

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Privar>
              <Home />
            </Privar>
          }
        />
      </Routes>
    </Router>
  );
}
