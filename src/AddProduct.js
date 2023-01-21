import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from './Header'

function AddProduct() {

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/add");
        }
    }, [])

    const [desc, setDesc] = useState("");
    const [product, setFile] = useState("");

    function Add() {
        let item = { desc, product }
        console.log(item);
        // const formData = new FormData();
        // formData.append('product', product);
        // formData.append('desc', desc);
        let url = "http://localhost:5000/api/product";
        let result =  fetch(url, {
            method: 'POST',
            body: JSON.stringify(item)
        }).then((response)=>{
            console.log(response);
            navigate("/list");
        });
        setDesc("");
        setFile("");
    }
    return (
        <>
            <Header />
            <Form className='Forms'>
                <Form.Group className="mb-3" controlId="formBasicDesc">
                    <Form.Label>Discreaption</Form.Label>
                    <Form.Control type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter Discripation" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFile">
                    <Form.Label>Choose Product</Form.Label>
                    <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Choose a Product" />
                </Form.Group>
                <Button variant="primary" onClick={Add}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddProduct;
