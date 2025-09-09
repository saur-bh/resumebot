import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChange } from './firebase/auth';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-muted-beige">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/settings" 
            element={
              user ? <SettingsPage user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/settings" /> : <LoginPage />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
