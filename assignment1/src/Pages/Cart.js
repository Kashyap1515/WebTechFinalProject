import React, { useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import '../App.css';

function Cart({ cartItems, changeQuantity, removeFromCart }) {

    const quantityChange = (index, quantity) => {
        changeQuantity(index, quantity);
    };
    const [showAlert, setShowAlert] = useState(false);

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    };

    const completeOrder = () => {
        setShowAlert(true);
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {showAlert && (
                            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                                Successfully Completed Your Order
                            </Alert>
                        )}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                id={`quantity-${item.id}`}
                                                className="form-control"
                                                value={item.quantity}
                                                onChange={(e) => quantityChange(index, parseInt(e.target.value))}
                                                min="1"
                                            />
                                        </td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="text-end">
                            <p>Total: ${calculateTotal()}</p>
                            <Button variant="primary" onClick={completeOrder}>Complete Order</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
