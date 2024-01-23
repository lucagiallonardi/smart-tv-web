import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Register.css'
import { Spinner } from '../layouts/Spinner';

const Register = () => {

    const [trimUsername, setTrimUsername] = useState('');
    const [trimPassword, setTrimPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showTrimPassword, setShowTrimPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async()=>{        
        try{
            const username = trimUsername.trim();
            const password = trimPassword.trim();

            if(username.length === 0){
                alert("Complete username")
            }else if(password.length === 0){
                alert("Complete password")
            }else{
            setIsLoading(true);
            const response = await fetch('https://gtv-render.onrender.com/api/register',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({username, password})
            });

            if(response.status === 201){
                window.location.href = '/';
                console.log('Usuario registrado exitosamente');
            }else if(response.status === 400){
                alert('This username is already registered')
            }
            else{
                console.log('Error al registrar el usuario');
            }
        }}catch(error){
            console.error('Error en la solicitud:', error);
        } setIsLoading(false);
    };

    if(isLoading){
        return <Spinner/>
    }
    const alertPassword = ()=>{
        alert("Passwords do not match");
    }

    return (
        <div className='registerContainer'>
            <img className="imgRegister"src='https://i.postimg.cc/W3zsQZG6/118264-Gg-N7ie-HJEoc-WR5z-Ptq1m-B2v3-Y96x-ULFas-h2.jpg' alt='imagen-fondo'/><div className="gradient-register"></div>
            <div className='registerDivRight'>
            <h2>Sing Up</h2>
            <div className="inputRegisterUsername">
            <i className="iconoRegister fa-solid fa-user"></i>
            <input
            type='text'
            placeholder='Username'
            value={trimUsername}
            onChange={(e)=> setTrimUsername(e.target.value)}
            required
            />
            </div>
            <div className="inputRegisterPassword">
            <i className="iconoRegister fa-solid fa-lock"></i>
            <input
            type={showTrimPassword ? 'text' : 'password'}
            placeholder='Password'
            value={trimPassword}
            onChange={(e) => setTrimPassword(e.target.value)}
            required
            />
            <button type='button' className='eyeButtonRegister1' onClick={() => setShowTrimPassword(!showTrimPassword)}>
            {showTrimPassword ? (
            <i className="fa-regular fa-eye-slash"></i>
            ) : (
                <i class="fa-regular fa-eye"></i>
            )}
            </button>
            </div>

            <div className="inputRegisterPassword">
            <i className="iconoRegister fa-solid fa-lock"></i>
            <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
            <button type='button' className='eyeButtonRegister2' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
            <i className="fa-regular fa-eye-slash"></i>
            ) : (
                <i class="fa-regular fa-eye"></i>
            )}
            </button>
            </div>
            <button onClick={trimPassword === confirmPassword ? handleRegister : alertPassword}>Register</button>
            <p>Do you already have an account?<Link to={'/'}><br/>Sign in</Link></p>            

            </div>
        </div>
    );
};

export default Register;
