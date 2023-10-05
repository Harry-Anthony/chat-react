import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./ui/home/Home";
import ProtectedRoute from "./ui/sharedComponents/protectedRoute";
import { Splash } from "./ui/Auth/splash";
import { Auth } from "./ui/Auth/Auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<Splash />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
