import React from 'react';

import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './css/styles.css';

import PostForm from './components/PostForm';
import ProfilePage from './components/ProfilePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUpForm />}/>
          <Route path='/login'  element={<LogInForm />}/>
          <Route path='/' element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/createpost" element={<PostForm />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
