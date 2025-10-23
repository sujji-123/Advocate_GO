// src/App.jsx
import React, { useState } from 'react'; // Import useState
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contextprovider/AuthContext';

// Core Pages
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import DummySignup from './Pages/DummySignup';
import AuthPage from './Pages/AuthPage';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import More from './Pages/More';

// Dashboard & Role Specific
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import ClientDashboard from './Pages/ClientDashboard';
import LawyerDashboard from './Pages/LawyerDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import AdvisorDashboard from './Pages/AdvisorDashboard';

// Feature Pages
import TopLawCollegesPage from './Pages/lawcolleges';
import LawyerTypeAdvisorPage from './Pages/Lawyertypeadvisor';
import LawyerLocator from './Pages/lawdir';
import LegalDocuments from './Pages/legaldocs';
import CaseStatus from './Pages/casestatus';
import UserDirectory from './Pages/UserDirectory';
import MyConnections from './Pages/MyConnections';
import MyProposals from './Pages/MyProposals';
import ChatPage from './Pages/ChatPage';

// Import the new components
import ProposalInbox from './Pages/ProposalInbox';
import Queries from './Pages/Queries';

// New Pages
import FAQsPage from './Pages/FAQs';
import LegalAidPage from './Pages/LegalAid';
import ProfilePage from './Pages/Profile';
import AccountSettingsPage from './Pages/AccountSettings';
import NotificationsPage from './Pages/Notifications';

// Friend's New Public Pages
import LegalSelfDiagnosis from './Pages/LegalSelfDiagnosis';
import LawCollegesIndia from './Pages/LawCollegesIndia';
import NearbyLawyerFinder from './Pages/NearbyLawyerFinder';
import CaseTimelineViewer from './Pages/CaseTimelineViewer';

// New Functional Pages
import EmergencyAssistance from './Pages/EmergencyAssistance';
import LegalResources from './Pages/LegalResources';
import CareerOpportunities from './Pages/CareerOpportunities';
import CommunityImpact from './Pages/CommunityImpact';

// --- ADD NEW PAGES ---
import ProfileDetail from './Pages/ProfileDetail';
import CategoryDetail from './Pages/CategoryDetail';
import RightsPage from './Pages/RightsPage';

// --- MODIFICATION START ---
// Import Navbar and Footer
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
// --- MODIFICATION END ---


// Placeholder for missing pages (Kept for routes not implemented yet)
const ComingSoon = ({ title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20"> {/* Added padding top */}
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600">This feature is under development and coming soon.</p>
       <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
            Go Back
       </button>
    </div>
  </div>
);

function App() {
  const { user } = useAuth();
  const allRoles = ['client', 'lawyer', 'student', 'advisor'];
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  return (
    <BrowserRouter>
      {/* --- MODIFICATION START: Persistent Layout --- */}
      <div className="flex flex-col min-h-screen">
        <Navbar setQuery={setSearchQuery} /> {/* Pass setter to Navbar */}
        <main className="flex-grow"> {/* Make main content grow */}
          <Routes>
      {/* --- MODIFICATION END --- */}

            {/* --- Public Routes --- */}
            {/* Pass searchQuery to pages that need it, e.g., Home */}
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/more" element={<More />} />
            <Route path="/top-law-colleges" element={<TopLawCollegesPage />} />
            <Route path="/lawyer-type-advisor" element={<LawyerTypeAdvisorPage />} />
            <Route path="/lawyer-locator" element={<LawyerLocator />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/legal-aid" element={<LegalAidPage />} />
            <Route path="/rights" element={<RightsPage />} />

            {/* --- ADDED: Profile and Category Routes --- */}
            <Route path="/:profileType/:id" element={<ProfileDetail />} />
            <Route path="/category/:id" element={<CategoryDetail />} />

            {/* Friend's New Public Routes */}
            <Route path="/legal-self-diagnosis" element={<LegalSelfDiagnosis />} />
            <Route path="/law-colleges-india" element={<LawCollegesIndia />} />
            <Route path="/nearby-lawyer-finder" element={<NearbyLawyerFinder />} />
            <Route path="/case-timeline-viewer" element={<CaseTimelineViewer />} />

            {/* New Functional Public Routes */}
            <Route path="/emergency-assistance" element={<EmergencyAssistance />} />
            <Route path="/legal-resources" element={<LegalResources />} />
            <Route path="/career-opportunities" element={<CareerOpportunities />} />
            <Route path="/community-impact" element={<CommunityImpact />} />

            {/* --- Auth Routes --- */}
            <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/dashboard" replace />} />
            <Route path="/register" element={!user ? <Signup /> : <Navigate to="/dashboard" replace />} />
            <Route path="/demo-signup" element={!user ? <DummySignup /> : <Navigate to="/dashboard" replace />} />
            <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/dashboard" replace />} />
            <Route path="/reset-password/:token" element={!user ? <ResetPassword /> : <Navigate to="/dashboard" replace />} />

            {/* --- Dashboard Redirector --- */}
            <Route
              path="/dashboard"
              element={
                user ? <Dashboard /> : <Navigate to="/login" replace state={{ from: '/dashboard' }} />
              }
            />

            {/* --- Role-Specific Dashboards & Protected Routes --- */}
            {/* Client Routes */}
            <Route element={<ProtectedRoute allowedRoles={['client']} />}>
              <Route path="/dashboard/client" element={<ClientDashboard />} />
              <Route path="/proposals/sent" element={<MyProposals />} />
              {/* Added /my-cases for client */}
              <Route path="/my-cases" element={<ComingSoon title="My Cases" />} />
              <Route path="/case-status" element={<CaseStatus />} />
            </Route>

            {/* Lawyer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['lawyer']} />}>
              <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
              <Route path="/proposals/inbox" element={<ProposalInbox />} />
            </Route>

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              {/* Note: Career Opps is public, maybe keep a protected version too? */}
              {/* <Route path="/career-opportunities" element={<CareerOpportunities />} /> */}
            </Route>

            {/* Advisor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['advisor']} />}>
              <Route path="/dashboard/advisor" element={<AdvisorDashboard />} />
              <Route path="/queries" element={<Queries />} />
              {/* Note: Community Impact is public */}
              {/* <Route path="/community-impact" element={<CommunityImpact />} /> */}
            </Route>

            {/* --- Protected Routes (Accessible by All Authenticated Roles) --- */}
            <Route element={<ProtectedRoute allowedRoles={allRoles} />}>
              <Route path="/users/:role" element={<UserDirectory />} />
              <Route path="/connections" element={<MyConnections />} />
              <Route path="/chat/:otherUserId" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<AccountSettingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/legal-docs" element={<LegalDocuments />} />
               {/* Add other shared protected routes here */}
            </Route>

            {/* --- Fallback Route --- */}
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />

      {/* --- MODIFICATION START: Persistent Layout --- */}
          </Routes>
        </main>
        <Footer />
      </div>
      {/* --- MODIFICATION END --- */}
    </BrowserRouter>
  );
}

export default App;