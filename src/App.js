import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UserHomePage from './components/user/UserHomePage';
import MainLayout from './general/MainLayout';


function App() {
  return <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/user/:userId" element={<MainLayout><UserHomePage /></MainLayout>} />
  </Routes>
}

export default App;
