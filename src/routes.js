import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

import Login from './pages/Login';
import Home from './pages/Home';
// import Character from './pages/Character';

export default function Routes() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
        )
        } />
    );

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/home" component={Home} />
                {/* <PrivateRoute path="/character/:id" component={Character} /> */}
            </Switch>
        </BrowserRouter>
    );
}