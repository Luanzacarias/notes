import {BrowserRouter, Routes,Route} from 'react-router-dom';
import { AuthContxtProvider } from './context/AuthContext';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { SignUp } from './pages/SignUp';

import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthContxtProvider>
        <Routes>
          <Route path="/" caseSensitive element={<Home />}/>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContxtProvider>
    </BrowserRouter>
  );
}

export default App;
