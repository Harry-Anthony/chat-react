import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './ui/home/Home';
import { Auth } from './ui/Auth/Auth';
import ProtectedRoute from './ui/sharedComponents/protectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
