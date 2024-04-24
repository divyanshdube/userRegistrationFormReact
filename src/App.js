import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmationPage from './Component/ConfirmationPage';
import RegisterForm from './Component/RegisterForm';

function App() {
  return (
   <>
   <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
