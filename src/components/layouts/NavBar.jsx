import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const userAct = localStorage.getItem('userAct');
    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userAct');
        window.location.reload();
        };


    return (
        <div>
            <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
  <Link to={"/"} className='navbar-brand'>SmartTV Web</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item nav-link2">
        <Link to={"/"} className='nav-link' aria-current="page">Home</Link>
        </li>
        <li className="nav-item nav-link2">
          <Link to={"/favorites"} className='nav-link'>Favorites</Link>
        </li>
        <li className="nav-item nav-link2">
          <Link to={"/store"} className='nav-link'>Apps</Link>
          
        </li>
        <li className="nav-item dropdown">
          <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user"></i>
          </div>
          <ul className="dropdown-menu">
            <li><h5>{userAct}</h5></li>
            <li className="dropdown-item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>  Logout</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    );
};

export default NavBar;