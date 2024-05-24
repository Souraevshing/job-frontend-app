import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit" element={<EditPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
