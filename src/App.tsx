import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Question } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
