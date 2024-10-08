import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { addLaptopToCart, getLaptopData } from '../Services/APIServices';


function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await getLaptopData();
            setProducts(products);
        };
        getProducts();
    }, []);

    return (
        <>
            <div className="container">
                <img src={"https://img.freepik.com/free-photo/laptop-near-smartphone-tags-gift-packets_23-2147961951.jpg?w=1800&t=st=1723587479~exp=1723588079~hmac=d66dfdb7525aaea74222f8f92e8f547b4568999ee05b6c0287ede81853a28072"} className="card-img-top" alt="bg" style={{ height: 300, width:"100%", objectFit: 'cover' }} />
                <h2 className='mt-4'>Trending Laptops</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 mt-2">
                    {products.map(product => (
                        <div className="col" key={product._id}>
                            <div className="animated">
                                <div className="card shadow-sm">
                                    <img src={product.image} className="card-img-top" alt={product.name} style={{ height: 225, objectFit: 'cover' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`/product/${product._id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                                                <button type="button" className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => {
                                                        addLaptopToCart('66b8a0ebc9a6707235c93b58', product._id, 1);
                                                        navigate('/cart');
                                                    }}>Add</button>
                                            </div>
                                            <small className="text-muted">${product.price}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductList;
