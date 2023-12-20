import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Vendorsignup = () => {
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        rPassword: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zip: ''
    });

    const navigate = useNavigate()
    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        if (form.password !== form.rPassword) {
            setError('Passwords do not match.');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await axios.post('https://backends-zgvg.onrender.com/api/signup/vendor', form);
            console.log('User created successfully');
            // Here you can redirect the user to the OTP page
            navigate('/Verifyvendorotp')
        
        } catch (error) {
            console.error('Error signing up:', error);
            // Here you can display an error message to the user
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    name="rPassword"
                    value={form.rPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />
                <input
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Street"
                    required
                />
                <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                />
                <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                />
                <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                />
                <input
                    type="text"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    required
                />
                {error && <p>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Vendorsignup;

































// import React, { Component } from 'react';
// import { Button, Form, FormGroup, FormControl, Row, Col } from 'react-bootstrap';
// import axios from 'axios';


// class Vendorsignup extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fullname: '',
//             email: '',
//             phone: '',
//             password: '',
//             rPassword: '',
//             street: '',
//             city: '',
//             state: '',
//             country: '',
//             zip: '',
//             agreedToTerms: false
//         };
//     }

//     handleChange = event => {
//         this.setState({
//             [event.target.id]: event.target.value
//         });
//     }

//     handleCheckboxChange = event => {
//         this.setState({
//             agreedToTerms: event.target.checked
//         });
//     }

//     handleSubmit = event => {
//         event.preventDefault();
//         console.log('Submitted!');
//     }

//     render() {
//         return (

//                 <Row>
//                     <Col md={6} mdOffset={3}>
//                         <h1>Signup</h1>
//                         <Form onSubmit={this.handleSubmit}>
//                             <FormGroup controlId="fullname">
//                                 <label>Fullname</label>
//                                 <FormControl type="text" value={this.state.fullname} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="email">
//                                 <label>Email Address</label>
//                                 <FormControl type="email" value={this.state.email} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="phone">
//                             <label>Phone Number</label>
//                                 <FormControl type="tel" value={this.state.phone} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="password">
//                                 <label>Password</label>
//                                 <FormControl type="password" value={this.state.password} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="rPassword">
//                             <label>Re-enter Password</label>
//                                 <FormControl type="password" value={this.state.rPassword} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="street">
//                             <label>Street Address</label>
//                                 <FormControl type="text" value={this.state.street} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="city">
//                             <label>City</label>
//                                 <FormControl type="text" value={this.state.city} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="state">
//                                 <label>State</label>
//                                 <FormControl type="text" value={this.state.state} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="country">
//                             <label>Country</label>
//                                 <FormControl type="text" value={this.state.country} onChange={this.handleChange} />
//                             </FormGroup>
//                             <FormGroup controlId="zip">
//                                 <label>Zip Code</label>
//                                 <FormControl type="text" value={this.state.zip} onChange={this.handleChange} />
//                             </FormGroup>
//                             {/* <FormGroup controlId="agreedToTerms">
//                                 <Checkbox checked={this.state.agreedToTerms} onChange={this.handleCheckboxChange}>
//                                     Agree to terms of use
//                                 </Checkbox>
//                             </FormGroup> */}
//                             <Button type="submit">Submit</Button>
//                         </Form>
//                     </Col>
//                 </Row>
//         );
//     }
// }

// export default Vendorsignup;