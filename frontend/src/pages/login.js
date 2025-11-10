import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { API_ENDPOINTS } from '../config';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required')
        }
        try {
            const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email.trim(), password })
            });
            
            const result = await response.json();
            const { success, message, token, jwtToken, name, error } = result;
            
            if (response.ok && success) {
                handleSuccess(message || 'Login successful');
                const authToken = token || jwtToken;
                if (authToken) {
                    localStorage.setItem('token', authToken);
                    localStorage.setItem('loggedInUser', name || email);
                    navigate('/');
                } else {
                    handleError('Authentication token not received');
                }
            } else {
                let errorMessage = message || 'Login failed';
                if (error) {
                    if (typeof error === 'string') {
                        errorMessage = error;
                    } else if (Array.isArray(error)) {
                        errorMessage = error[0]?.message || errorMessage;
                    } else if (error.details && Array.isArray(error.details)) {
                        errorMessage = error.details[0]?.message || errorMessage;
                    }
                }
                if (response.status === 403) {
                    errorMessage = 'Invalid email or password';
                } else if (response.status === 500) {
                    errorMessage = message || 'Server error. Please try again later.';
                } else if (response.status === 503) {
                    if (result.details) {
                        errorMessage = result.message + '. ' + result.details;
                    } else {
                        errorMessage = result.message || 'Database is not available. Please check if MongoDB is running.';
                    }
                }
                handleError(errorMessage);
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                handleError('Cannot connect to server. Please check if the backend is running.');
            } else {
                handleError(err.message || 'Network error. Please try again.');
            }
        }
    }

    return (
        <div className='auth-container'>
            <div className='container'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                            required
                        />
                    </div>
                    <button type='submit' className='btn-primary'>Login</button>
                    <div className='auth-link'>
                        <span>Don't have an account? </span>
                        <Link to="/register">Sign Up</Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login