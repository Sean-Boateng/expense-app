import React, { useState } from 'react';
import axios from 'axios';
import router from 'next/router';

export default function Login() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [accesstoken, setAccessToken] = useState({});
    


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
                username: loginUsername,
                password: loginPassword
            });
            const token = response.data.access;

            handleSuccessfulLogin(token);
            setAccessToken(token)
            console.log('token', accesstoken)

        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
                username: registerUsername,
                email: registerEmail,
                password: registerPassword,
                first_name: registerFirstName,
                last_name: registerLastName
            });
            // Assuming you have a function to handle successful registration
            handleSuccessfulRegistration(response.data);
            console.log('R - Success')
        } catch (error) {
            setError('Registration failed. Please check your information.');
        }
    };

    const handleSuccessfulLogin = (token:any) => {

        localStorage.setItem('accessToken', token);
        console.log('Login successful. Token:', token);
        router.push('/Dashboard');
    };

    const handleSuccessfulRegistration = (userData:any) => {
        console.log('Registration successful. User data:', userData);
    };

    const toggleRegisterForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <main>
        {!isRegistering ? (
            <>
                <h1>Login</h1>
                {error && <p>{error}</p>}
                <form>
                    <label>
                        Username:
                        <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className=' text-red-500'/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className=" text-black pl-2 pr-2"/>
                    </label>
                    <button type="button" onClick={handleLogin}>Login</button>
                </form>
                <button onClick={toggleRegisterForm}>Register</button>
            </>
        ) : (
            <>
                <h1>Register</h1>
                {error && <p>{error}</p>}
                <form>
                    <label>
                        Username:
                        <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} className=" text-black pl-2 pr-2"/>
                    </label>
                    <label>
                        Email:
                        <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className=" text-black pl-2 pr-2"/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className=" text-black pl-2 pr-2"/>
                    </label>
                    <label>
                        First Name:
                        <input type="text" value={registerFirstName} onChange={(e) => setRegisterFirstName(e.target.value)} className=" text-black pl-2 pr-2"/>
                    </label>
                    <label>
                        Last Name:
                        <input type="text" value={registerLastName} onChange={(e) => setRegisterLastName(e.target.value)} className=" text-black pl-2 pr-2"/>
                    </label>
                    <button type="button" onClick={handleRegister}>Register</button>
                    </form>
                    <button onClick={toggleRegisterForm}>Back to Login</button>
            </>
        )}
    </main>

    );
}
