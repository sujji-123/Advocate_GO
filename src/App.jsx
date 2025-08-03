
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contextprovider/AuthContext';


import Home from './Pages/Home';
import Signup from './Pages/Signup';
import AuthPage from './Pages/AuthPage'; 
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Pages/Dashboard';
import More from './Pages/More'; 

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        
        <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/reset-password/:token" element={!user ? <ResetPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/more" element={<More />} />

      
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

      
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;