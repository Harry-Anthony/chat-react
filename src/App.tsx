import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './refact/page/auth/Auth';
import ProtectedRoute from './ui/sharedComponents/protectedRoute';
import { Login } from './refact/page/auth/Login';
import { Register } from './refact/page/auth/Register';
import { ChatHome } from './refact/page/chat/ChatHome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute goal="/chatHome"/>}>
          <Route path="/" element={<Auth />}>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>
        <Route path="/chatHome" element={<ProtectedRoute goal="/" isHome={true} />}>
          <Route path="/chatHome" element={<ChatHome />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
