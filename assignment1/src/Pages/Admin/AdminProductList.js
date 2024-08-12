import React, { useEffect, useState } from 'react';
import '../../App.css';
import { deleteLaptop, getLaptopData } from '../../Services/APIServices';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const products = await getLaptopData();
        setProducts(products);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleDeleteItem = (productId) => {
        deleteLaptop(productId);
        getProducts();
    }
    return (
        <>
            <div className="container mt-3">
                <h2 className="mb-4">Products</h2>
                <Button variant="primary" className='mb-4' onClick={() => { navigate('/product/add'); }}>Add Product</Button>

                {products.length === 0 ? (
                    <p>There is no any Product</p>
                ) : (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td> <img src={product.image} className="card-img-top" alt={product.name} style={{ height: 100, objectFit: 'cover' }} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>
                                            <Button variant="primary" className='m-2' onClick={() => { navigate(`/product/update/${product._id}`); }}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteItem(product._id)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminProductList;
