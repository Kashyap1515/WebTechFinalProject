import { Form, Button } from 'react-bootstrap';
import '../App.css';

export default function Account({ formData, handleInputChange, handleSubmit }) {
    return (
        <>
            <div className="container mt-2">
                <h2 className="text-center mb-4">Your Profile</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="email" className='mt-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="address" className='mt-2'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="city" className='mt-2'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="state" className='mt-2'>
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" name="state" value={formData.state} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="zip" className='mt-2'>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" name="zip" value={formData.zip} onChange={handleInputChange} required />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" onChange={handleSubmit}>{formData.id === 1 ? "Update" : "Add"}</Button>
                </Form>
            </div>
        </>
    );
}
