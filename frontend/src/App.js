import React from 'react';

import './App.css'

import imgLogo from './assets/logo.svg'
import Routes from './routes'


function App() {
  return (
    <div className="container">
          <img src={imgLogo} alt="logo" />
        <div className="content">
          <Routes />
        </div>
    </div> 
    
  );
}

export default App;
