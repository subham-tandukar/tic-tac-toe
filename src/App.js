import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Index from "./components/Index";
import MainState from "./components/context/MainState";
import TwoPlayer from "./components/TwoPlayer";
import SelectMode from "./components/SelectMode";
import Easy from "./components/Easy";
import Hard from "./components/Hard";

function App() {
  return (
    <>
      <MainState>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mode" element={<SelectMode />} />
          <Route path="/two-player" element={<TwoPlayer />} />
          <Route path="/easy" element={<Easy />} />
          <Route path="/hard" element={<Hard />} />
        </Routes>
      </MainState>
    </>
  );
}

export default App;
