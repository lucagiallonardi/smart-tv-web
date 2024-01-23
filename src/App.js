import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
import Favorites from './components/Favorites/Favorites';
import { Spinner } from './components/layouts/Spinner';

function App() {

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };


  return (
    <div className="App">
      <>
      <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
       <Route path="/register" element={<Register/>}></Route>
       <Route path="/store" element={authenticated?(<Store/>) : (<Login handleLogin={handleLogin}/>)}></Route>
       <Route path="/favorites" element={authenticated? (<Favorites/>) : (<Login handleLogin={handleLogin}/>)}></Route>       
      </Routes>
      </Router>
      </>
    </div>
  );
}

export default App;
