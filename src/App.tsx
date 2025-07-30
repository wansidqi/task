import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Question, Leaderboard } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
