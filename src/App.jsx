// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contextprovider/AuthContext';

// Import Pages
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import AuthPage from './Pages/AuthPage'; 
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Pages/Dashboard';
import More from './Pages/More'; 
import TopLawCollegesPage from './Pages/lawcolleges';
import LawyerTypeAdvisorPage from './Pages/Lawyertypeadvisor';
import LawyerLocator from './Pages/lawdir';
import LegalDocuments from './Pages/legaldocs';
import CaseStatus from './Pages/casestatus';

import ProtectedRoute from './Components/ProtectedRoute';
import ClientDashboard from './Pages/ClientDashboard';
import LawyerDashboard from './Pages/LawyerDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import AdvisorDashboard from './Pages/AdvisorDashboard';

// --- NEWLY IMPORTED PAGES ---
import UserDirectory from './Pages/UserDirectory';
import MyConnections from './Pages/MyConnections';
import MyProposals from './Pages/MyProposals';
import ChatPage from './Pages/ChatPage';
// --- END NEW ---


function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<More />} />
        <Route path="/top-law-colleges" element={<TopLawCollegesPage />} />
        <Route path='/lawyer-type-advisor' element={<LawyerTypeAdvisorPage />} />
        <Route path='/lawyer-locator' element={<LawyerLocator />} />
        
        {/* These are probably better as protected routes, but leaving as-is */}
        <Route path='/legal-docs' element={<LegalDocuments />} />
        <Route path='/case-status' element={<CaseStatus />} /> 

        {/* --- Auth Routes (Logged-out users only) --- */}
        <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/reset-password/:token" element={!user ? <ResetPassword /> : <Navigate to="/dashboard" />} />

        
        {/* --- Main Dashboard Redirector --- */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

        {/* --- Protected Role-Specific Dashboards --- */}
        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/proposals/sent" element={<MyProposals />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['lawyer']} />}>
          <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/dashboard/student" element={<StudentDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['advisor']} />}>
          <Route path="/dashboard/advisor" element={<AdvisorDashboard />} />
        </Route>

        {/* --- NEW PROTECTED ROUTES (All Roles) --- */}
        <Route element={<ProtectedRoute allowedRoles={['client', 'lawyer', 'student', 'advisor']} />}>
          <Route path="/users/:role" element={<UserDirectory />} />
          <Route path="/connections" element={<MyConnections />} />
          <Route path="/chat/:otherUserId" element={<ChatPage />} />
        </Route>

        {/* --- Fallback Route --- */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;