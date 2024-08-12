import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../App.css';
import { deleteLaptopFromCart, getCartsData } from '../Services/APIServices';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
      const localUserInfo = JSON.parse(localStorage.getItem('usetInfo'));
      if (localUserInfo) {
        setUserData(localUserInfo);
      }else{
        setUserData(null);
      }
    }, []);

    
    useEffect(() => {
        const getCarts = async () => {
            const carts = await getCartsData();
            setCarts(carts);
        };
        getCarts();
    }, []);

    const quantityChange = (index, quantity) => {
        carts[index].quantity = quantity;
        setCarts([...carts]);
    };

    const removeFromCart = async (cartId) => {
        await deleteLaptopFromCart(cartId);
        const carts = await getCartsData();
        setCarts(carts);
    }

    const calculateTotal = () => {
        let total = 0;
        carts.forEach(cartItem => {
            total += cartItem.product.price * cartItem.quantity;
        });
        return total.toFixed(2);
    };

    const completeOrder = () => {
        if(userData){
            navigate('/checkout')
        }else{
            alert("Please login first to process checkout.")
            navigate('/login')
        }
    };

    return (
        <>
            <div className="container mt-3">
                {carts.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
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
                                {carts.map((cartItem, index) => (
                                    <tr key={cartItem._id}>
                                        <td>{cartItem.product.name}</td>
                                        <td>${cartItem.product.price.toFixed(2)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                id={`quantity-${cartItem._id}`}
                                                className="form-control"
                                                value={cartItem.quantity}
                                                onChange={(e) => quantityChange(index, parseInt(e.target.value))}
                                                min="1"
                                            />
                                        </td>
                                        <td>${(cartItem.product.price * cartItem.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => removeFromCart(cartItem._id)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="text-end">
                            <Button variant="primary" onClick={completeOrder}>Complete Order</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
