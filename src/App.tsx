import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Locations } from './pages/Locations';
import { CityDetail } from './pages/CityDetail';
import { TownDetail } from './pages/TownDetail';
import { VenueDetail } from './pages/VenueDetail';
import { BookingFlow } from './pages/Booking/BookingFlow';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { CustomerDashboard } from './pages/Dashboard/CustomerDashboard';
import { AdminDashboard } from './pages/Dashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="locations" element={<Locations />} />
          <Route path="locations/:city" element={<CityDetail />} />
          <Route path="locations/:city/:town" element={<TownDetail />} />
          <Route path="locations/:city/:town/:venue" element={<VenueDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path="book" 
            element={
              <ProtectedRoute>
                <BookingFlow />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute requireRole="CUSTOMER">
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin" 
            element={
              <ProtectedRoute requireRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;