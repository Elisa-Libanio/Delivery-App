import React from 'react';
// import { useHistory } from 'react-router';
import LoginComponent from '../components/loginComponent';
import './style.css';

export default function Login() {
  return (
    <div className="login-page">
      <div className="div-logo">
        <spam>Test</spam>
      </div>
      <LoginComponent />
    </div>
  );
}
