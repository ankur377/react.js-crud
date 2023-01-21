import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from './Header'

function Register() {

    const history = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            history("/add");
        }
    },[])

    const [username, setName] = useState("");
    const [fullname, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    function signup() {
        let item = { username, fullname, password, email }
        let setInfo = { username, fullname, email }
        let url = "http://localhost:5000/api/register";
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
                localStorage.setItem("user-info", JSON.stringify(setInfo));
                history("/add");
                console.log(resp);
            })
        })
        setName("");
        setEmail("");
        setFullName("");
        setPassword("");
    }
    return (
        <>
            <Header />
            <Form className='Forms'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setName(e.target.value)} placeholder="Enter User Name" />
                </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder="Enter Full Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={signup}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Register;