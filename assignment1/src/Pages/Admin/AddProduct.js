import { Form, Button } from 'react-bootstrap';
import '../../App.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addLaptop, getLaptopById, updateLaptop } from '../../Services/APIServices';

export default function AddProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);
    const [product, setProduct] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        const getProduct = async () => {
            if (id) {
                const productData = await getLaptopById(id);
                setProduct(productData);
                setIsUpdate(true);
                setFormData({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    image: productData.image
                })
            } else {
                setIsUpdate(false);
            }
        };
        getProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdate) {
            const response = await updateLaptop(product._id, formData);
            if (response.message) {
                alert(response.message);
            } else {
                alert('Product Update Successfully..');
                navigate('/');
            }
        } else {
            const response = await addLaptop(formData);
            if (response.message) {
                alert(response.message);
            } else {
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    image: ''
                })
                alert('Product Added Successfully..');
                navigate('/');
            }
        }
    };


    return (
        <>
            <div className="container mt-2">
                <h2 className="text-center mb-4">{isUpdate ? 'Update' : 'Add'} Product</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Laptop Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="description" className='mt-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="price" className='mt-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="image" className='mt-2'>
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control type="text" name="image" value={formData.image} onChange={handleInputChange} required />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" onChange={handleSubmit}>{isUpdate ? "Update" : "Add"}</Button>
                </Form>
            </div>
        </>
    );
}
