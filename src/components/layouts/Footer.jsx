import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
            <div className="card text-center footerContainer">
            <div className="card-header">
                Created by
            </div>
            <div className="card-body">
                <h5 className="card-title">Luca Giallonardi</h5>
                <p className="card-text">Web Developer | Programmer Analyst</p>
                <Link to={'https://www.linkedin.com/in/luca-giallonardi-084992154/'} className="btn btn-primary" target='_label'>go LinkedIn</Link>
            </div>
            <div className="card-footer text-body-secondary">
                2023 - Luca Giallonardi - All rights reserved <i class="fa-regular fa-registered"></i>
            </div>
            </div>
    );
};

export default Footer;