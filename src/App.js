import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Upload from "./components/Upload"
import Download from "./components/Download"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
