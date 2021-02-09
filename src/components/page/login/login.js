import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../../../contexts'
import { Link, useHistory } from "react-router-dom"
import Logotype from '../../logotype';
import { RoutesEnum } from '../../../enum';

/** Форма автаризации пользователя */
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push(RoutesEnum.DASHBOARD);
        } catch(e){
            setError(`Failed to log in (${e})`)
        }
        setLoading(false)
    }

    const onChangeInput = () => {
        setError('')
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Logotype />
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger" className='text-center'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} 
                            onChange={onChangeInput} 
                            required />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} 
                            onChange={onChangeInput}  
                            required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to={RoutesEnum.FORGOT_PASSWORD}>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to={RoutesEnum.SIGNUP}>Sign Up</Link>
            </div>
        </>
    )
}