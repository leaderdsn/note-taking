import React, { useState } from "react";
import { Container, Image, Navbar, Alert} from "react-bootstrap";
import { useAuth } from "../../../contexts";
import { Link, useHistory } from "react-router-dom";
import logo from '../../../images/logo-app.jpg';
import NoteForm from "../note-form";
import { RoutesEnum } from '../../../enum';
import './dashboard.css';


/** Приватная верхняя панель, доступная авторизованным пользоваетелям */
export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push(RoutesEnum.LOGIN);
        } catch(e) {
            setError(`Failed to log out (${e})`);
        }
    }

    return (
        <>  
            <Navbar className='navbar border-bottom fixed-top m-0 px-2 py-0' bg='light' expand='lg' >
                <Navbar.Brand className="p-0" href={RoutesEnum.DASHBOARD}>
                    <Image src={logo} className="logo img-thumbnail mr-2" roundedCircle />
                    <h4 className='logo-title'>Note-taking</h4>
                </Navbar.Brand>
                {
                    error ? <Alert 
                                variant="danger"  
                                className='alert-error my-0 mx-auto w-50 text-center' 
                                >
                                    {error}
                            </Alert> : ''
                }
                <Navbar.Toggle className='navbar-toggle' aria-controls="basic-navbar-nav"  />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Container className="container-profile justify-content-end m-0 p-0" > 
                        <Navbar.Text>
                            <strong>Profile:</strong>
                            <span 
                                className="profile-info ml-1" 
                            >
                                {currentUser.email}
                            </span>
                        </Navbar.Text>
                        <Link to="/update-profile" className="btn btn-primary ml-3 ">
                            Update Profile
                        </Link>
                        <Link to={RoutesEnum.LOGIN} className="btn btn-outline-primary ml-2"  onClick={handleLogout}>
                            Log Out
                        </Link>
                    </Container>
                </Navbar.Collapse>
            </Navbar>
            <NoteForm />
        </>   
    )
}