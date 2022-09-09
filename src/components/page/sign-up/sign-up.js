import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts";
import { Link, useHistory } from "react-router-dom";
import Logotype from '../../logotype';
import { RoutesEnum } from '../../../enum';

/** Форма регитрации пользователя */
export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push(RoutesEnum.LOGIN)
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Logotype />
                    <h2 className="text-center mb-4"> Sign Up </h2> 
                    {
                        error && <Alert variant="danger"> {error} </Alert>
                    } 
                    <Form onSubmit={handleSubmit} >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label> Email </Form.Label> 
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required />
                        </Form.Group> 
                        <Form.Group controlId="formBasicPassword1">
                            <Form.Label> Password </Form.Label> 
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required />
                        </Form.Group> 
                        <Form.Group controlId="formBasicPassword2">
                            <Form.Label> Password Confirmation </Form.Label> 
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                required />
                        </Form.Group> 
                        <Button disabled={loading}
                            className="w-100"
                            type="submit"> Sign Up </Button> 
                    </Form> 
                </Card.Body> 
            </Card> 
            <div className="w-100 text-center mt-2" >
                Already have an account ? <Link to={RoutesEnum.LOGIN}> Log In </Link> 
            </div> 
        </>
        )
    }