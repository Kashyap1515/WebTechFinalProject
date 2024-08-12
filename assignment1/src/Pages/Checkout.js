import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeYourOrder, deleteEntireCart, getCartsData } from '../Services/APIServices';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

function CheckoutScreen() {
  const stripePromise = loadStripe('pk_test_51PmwhmP3k45EiSGxOEdyXOFHubNZhBaivg5ug2VaXoHeN5x4cplxpFzxPaoDwDjaY2zdV32WmQFCGAh6AWpTMLuM00qjTUGI82');
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [totalCost, setTotalCost] = useState(0);
  const [cartItem, setCarts] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('usetInfo'));
    if (localUserInfo) {
      setUserData(localUserInfo);
    } else {
      setUserData(null);
    }
  }, []);

  const getProduct = async () => {
    const cartItem = await getCartsData();
    setCarts(cartItem);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    calculateTotal()
  }, [cartItem]);

  const calculateTotal = () => {
    let sum = 0;
    cartItem.forEach(item => {
      sum += item.quantity * item.product.price;
    });
    setTotalCost(sum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      user_id: userData._id || '',
      products: cartItem.map((product) =>
        ({ product: product._id, quantity: product.quantity })
      ),
      totalCost: totalCost.toFixed(2)
    }
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[error]', error);
      alert(`${error.message || 'Something went wrong '}`);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      alert('Order Place Successfully');
      await placeYourOrder(order);
      await deleteEntireCart();
      navigate('/')
    }
  };

  return (
    <div className="container">
      <h1 className="my-2">Checkout Order</h1>
      <br/>
      <Row>
        <Col md={5}>
          <h4 className="mb-3">Order Summary</h4>
          <div className="container card card-body mb-3">
            {(cartItem.map((product) =>
              <>
                <p>{product.product.name} : {product.quantity} X {product.product.price} = {(product.quantity * product.product.price).toFixed(2)}</p>
              </>
            ))}
            <div className='d-flex justify-content-between'>
              <b>Subtotal : </b>
              <p> {totalCost.toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <b>Tax(13%) : </b>
              <p> {(totalCost * 0.13).toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <b>Total Cost :</b>
              <p> {(totalCost + (totalCost * 0.13)).toFixed(2)}</p>
            </div>
          </div>
        </Col>
        <Col md={1}></Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h4 className="mb-3">Contact Information</h4>
            <div className="mb-3">
              <div className="form-label">Name: <span>{userData.username || ''}</span></div>
            </div>
            <div className="mb-3">
              <div className="form-label">Email: <span>{userData.email || ''}</span></div>
            </div>
            <div className="mb-3">
              <div className="form-label">Address: <span>{userData.shippingAddress || ''}</span></div>
            </div>
            <h4 className="mb-3">Payment Information</h4>
            <Form.Group>
              <Form.Label>Card Details</Form.Label>
              <CardElement />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" onChange={handleSubmit}>Complete Your Order</Button>
          </Form>
        </Col>
      </Row>
      <br /><br />
    </div>
  );
};

export default CheckoutScreen;