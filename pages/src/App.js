import React, {useEffect,useState} from 'react';
import SignIn from './webpages/signIn';
import Dashboard from './webpages/dashboard';
import SignUp from './webpages/signUp';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
     
      <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/" element={<Navigate to="/dashboard" />} /> 
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
     </div>
  );
}

export default App;
