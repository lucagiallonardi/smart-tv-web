import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    

    const handleLogin = async () => {
        try{
            const response = await fetch('https://gtv-render.onrender.com/api/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({username, password})
            });

            if(response.status ===200){
                const { token } = await response.json();
                localStorage.setItem('userAct', username);
                localStorage.setItem('token', token); // Almacena el token en el almacenamiento local
                window.location.reload();
            }else{
                alert("Invalid username or password");
            }
        }catch(error){
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className='loginContainer'>
            <img className="imgLogin"src='https://i.postimg.cc/W3zsQZG6/118264-Gg-N7ie-HJEoc-WR5z-Ptq1m-B2v3-Y96x-ULFas-h2.jpg' alt='imagen-fondo'/><div className="gradient-login"></div>
            <div className='loginDivRight'>
            <h2>Welcome</h2>
            <div className="inputUsername">
            <i className="iconoLogin fa-solid fa-user"></i>
            <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            /></div>
            <div className="inputPassword">
            <i className="iconoLogin fa-solid fa-lock"></i>
            <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <button type='button' className='eyeButtonLogin' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
            <i className="fa-regular fa-eye-slash"></i>
            ) : (
                <i class="fa-regular fa-eye"></i>
            )}
            </button>
            </div>

            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <Link to={'/register'}>Sign up</Link></p>
            </div>
            
        </div>
    );
};

export default Login;