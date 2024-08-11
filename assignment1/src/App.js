import './App.css';
import { Route, Routes } from 'react-router-dom';
import  HomeRoutes  from './Routes/HomeRoutes';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
      id: 0,
      firstName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    }); 
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id = "1";
    setFormData({...formData, id: 1});
  };

  const addToCart = (laptop) => {
    console.log(laptop);
    const index = cart.findIndex(item => item.id === laptop.id);
    if (index !== -1) {
      cart[index].quantity = laptop.quantity + 1;
    } else {
      cart.push(laptop);
    }
    setCart([...cart]);
  };
  
  const changeQuantity = (index, quantity) => {
    cart[index].quantity = quantity;
    setCart([...cart]);
  };

  const removeFromCart = (id) => {
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
  };

  return (
    <>
      <Routes>
          <Route path="*" element={<HomeRoutes formData={formData} handleInputChange={handleInputChange} cartItems={cart} addToCart={addToCart} changeQuantity={changeQuantity} removeFromCart={removeFromCart} handleSubmit={handleSubmit}/>} />
      </Routes>
    </>
  ); 
}

export default App;
