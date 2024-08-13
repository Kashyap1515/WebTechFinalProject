
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginResponse } from '../../Services/APIServices';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await loginResponse(formData.username, formData.password);
            var loginData = await data.json();

            if (!data.ok) {
                alert(`${loginData.message}`);
                return;
            }
            alert(`${loginData.message}`);
            localStorage.setItem('usetInfo', JSON.stringify(loginData.data));
            navigate('/');
            window.location.reload()
        } catch (err) {
            console.error('Error Login:', err);
        }
    };

    return (
        <div className="container text-center mt-5" style={{ width: '30%' ,height: '100%'}}>
            <h1 className="my-4">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" id="username" name="username" className="form-control" placeholder='Enter User Name' value={formData.username}
                        onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" id="password" name="password" className="form-control" placeholder='Enter Password' value={formData.password}
                        onChange={handleChange} required />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};