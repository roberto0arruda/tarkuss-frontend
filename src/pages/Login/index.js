import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email, password });

        const { message } = response.data;

        if (message) {
            console.log(message);
        } else {
            const { _id, username } = response.data;
            const user = { _id, username };

            localStorage.setItem('user', JSON.stringify(user));

            history.push('/home');
        }
    }

    return (
        <div className="login-page">
            <div className="d-flex flex-row">
                <div className="col-md-4 offset-8">
                    <div className="login-form">
                        <div className="content">
                            <h4 className="text-center">Sign in</h4>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Login</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    placeholder="robertoa0rruda@hotmail.com"
                                />

                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    placeholder="123456"
                                />

                                <button type="submit" className="btn-login">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
