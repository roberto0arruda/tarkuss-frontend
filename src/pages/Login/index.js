import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import api from '../../services/api';

import { isAuthenticated } from '../../auth';

import logo from '../../assets/LOGO.svg';
import millenium from '../../assets/Millenium_falcon.png';

import './styles.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email, password });

        const { message } = response.data;

        if (message) {
            Toast.fire({
                icon: 'error',
                title: message
            })
        } else {
            const { _id, username } = response.data;
            const user = { _id, username };

            localStorage.setItem('user', JSON.stringify(user));

            Toast.fire({
                icon: 'success',
                title: user.username,
                text: 'Signed in successfully '
            })

            history.push('/home');
        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/home');
        }
    }, [history])

    return (
        <div className="container-fluid amarelo">
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-6 col-lg-8 bg-image">
                    <img id="sw-logo" src={logo} alt="LOGO" />
                    <img id="falcon" src={millenium} alt="millenium" />
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="login align-items-center pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading text-center py-3">Sign in</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-label-group">
                                            <label htmlFor="inputEmail">Login</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                value={email}
                                                onChange={event => setEmail(event.target.value)}
                                                placeholder="robertoa0rruda@hotmail.com"
                                                required
                                            />
                                        </div>
                                        <div className="form-label-group">
                                            <label htmlFor="inputPassword">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                value={password}
                                                onChange={event => setPassword(event.target.value)}
                                                placeholder="123456"
                                                required
                                            />
                                        </div>
                                        <div className="form-label-group text-center pt-4">
                                            <button type="submit" className="btn btn-sm btn-primary btn-login font-weight-bold">Sign in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
