import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // routing: navigate between the UploadPage and EditorPage

import './App.css';
import UploadPage from "./pages/UploadPage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  ); 
}

export default App;
