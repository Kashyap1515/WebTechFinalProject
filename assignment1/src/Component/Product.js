import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { addLaptopToCart, getLaptopById } from '../Services/APIServices';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            const product = await getLaptopById(id);
            setProduct(product);
        };
        getProduct();
    }, [id]);

    return (
        <>
            <div className="container mt-4">
                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        Your order is Successfully Added to the cart
                    </Alert>
                )}
                <div className="card mb-4 shadow-sm">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={product.image} className="card-img" alt={product.name} style={{ height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Price: ${product.price}</strong></p>
                                <div className="d-flex align-items-center">
                                    <div className="form-group mr-3">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className="form-control"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            min="1"
                                        />
                                    </div>
                                    <button className="btn btn-primary mt-4" style={{ marginLeft: 10 }}
                                        onClick={() => {
                                            addLaptopToCart('66b8a0ebc9a6707235c93b58', product._id, quantity);
                                            setShowAlert(true);
                                            navigate('/cart');
                                        }
                                        }>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
