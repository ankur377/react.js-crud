import Header from './Header'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history("/add");
        }
    }, [])
    function Login() {
        let item = { password, email }
        let url = "http://localhost:5000/api/Login";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            console.log(result);
            result.json().then((resp) => {
                let data = {username:resp.username,fullname:resp.fullname,email:resp.email}
                localStorage.setItem("user-info", JSON.stringify(data));
                setEmail("");
                setPassword("");
                history("/add");
            })
        })
    }
    // async function Login() {
    //     let result = await fetch("http://localhost:5000/login", {
    //         method: 'post',
    //         body: JSON.stringify({ email, password }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Origin': 'https://localhost:3000',
    //             'Accept': 'application/json'
    //         }
    //     });
    //     result = await result.json();
    //     localStorage.setItem("user-info", JSON.stringify(result));
    //     setEmail("");
    //     setPassword("");
    //     history("/add");

    // }
    return (
        <div>
            <Header />
            <Form className='Forms'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={Login}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login;