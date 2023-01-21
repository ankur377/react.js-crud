import Header from './Header'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UpdateProduct() {
    const [data, setData] = useState([]);
    const [desc, setDesc] = useState("");
    const [product, setFile] = useState("");
    const [userid, setUserid] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    useEffect(() => {
        getList();
    }, [])
    function selectUser(_id) {
        setShow(true);
        let items = data[_id];
        // console.log(data[_id]);
        setDesc(items.desc);
        setUserid(items._id);
    }
    function getList() {
        fetch("http://localhost:5000/api/all/products").then((result) => {
            result.json().then((response) => {
                setData(response)
                setDesc(response[0].desc);
                setFile(response[0].img);
                setUserid(response[0]._id);
            })
        })
    }
    function deleteUser(id) {
        fetch(`http://localhost:5000/api/product/${id}`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((response) => {
                console.log(response);
                getList();
            })
        })
    }
    function UpdateUser() {
        const formData = new FormData();
        formData.append('product', product);
        formData.append('desc', desc);
        let url = `http://localhost:5000/api/product/${userid}`;
        console.log(formData);
        let result = fetch(url, {
            method: 'PUT',
            body: formData
        }).then((response) => {
            setShow(false);
            getList();
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        setDesc("");
        setFile("");
    }
    return (
        <div >


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='Forms'>
                        <Form.Group className="mb-3" controlId="formBasicDesc">
                            <Form.Label>Discreaption</Form.Label>
                            <Form.Control type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter Discripation" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDesc">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={UpdateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Header />
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>Discripation</td>
                        <td>Image</td>
                        <td>Options</td>
                    </tr>
                    {
                        data.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.desc}</td>
                                <td><img src={"http://localhost:5000/" + item.img[0]} style={{ height: "50px" }} alt="loading..." /></td>
                                <tr style={{ display: "initial" }}>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => deleteUser(item._id)} className="me-2 mt-3 ml-3">
                                            delete
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="outline-warning" onClick={() => selectUser(i)} className="me-2 mt-3 ml-3">
                                            update
                                        </Button>
                                    </td>
                                </tr>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div >
    )
}

export default UpdateProduct;