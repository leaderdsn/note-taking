import React from "react";
import Signup from "../page/sign-up";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../../contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../page/dashboard";
import Login from '../page/login';
import PrivateRoute from "../private-route";
import ForgotPassword from "../page/forgot-password";
import UpdateProfile from "../page/update-profile";
import { RoutesEnum } from "../../enum";
import './app.css';

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path={RoutesEnum.DASHBOARD} component={Dashboard} to={RoutesEnum.LOGIN} />
                        <Container
                            className="container d-flex align-items-center justify-content-center"
                        > 
                            <div className="container-auth w-100" >
                                <PrivateRoute path={RoutesEnum.UPDATE_PROFILE} component={UpdateProfile} to={RoutesEnum.LOGIN} />
                                <Route path={RoutesEnum.SIGNUP} component={Signup} />
                                <Route path={RoutesEnum.LOGIN} component={Login} />
                                <Route path={RoutesEnum.FORGOT_PASSWORD} component={ForgotPassword} />
                            </div>
                        </Container>
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    )
}

export default App