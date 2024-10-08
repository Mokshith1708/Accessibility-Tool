import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home.jsx";
import LandingPage from "./components/LandingPage.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </Router>
  );
}

export default App;

