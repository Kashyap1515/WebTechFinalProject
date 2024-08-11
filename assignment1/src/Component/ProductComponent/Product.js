import { useParams } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';
import { products } from '../../data';

function Product({ addToCart }) {
    const { id } = useParams();
    const laptop = products[id - 1];
    const [quantity, setQuantity] = useState(laptop.quantity);

    const handleAddToCart = () => {
        addToCart({ ...laptop, quantity });
    };

    return (
        <>
            <div className="container mt-4">
                <div className="card mb-4 shadow-sm">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={laptop.image} className="card-img" alt={laptop.name} style={{ height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{laptop.name}</h5>
                                <p className="card-text">{laptop.description}</p>
                                <p className="card-text"><strong>Price: ${laptop.price}</strong></p>
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
                                    <button className="btn btn-primary mt-4" style={{ marginLeft: 10 }} onClick={handleAddToCart}>
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
