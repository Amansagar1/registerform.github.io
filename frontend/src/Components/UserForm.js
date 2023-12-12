import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import './Userform.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../Actions/userActions';

function UserForm() {
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address1: '',
        address2: '',
        state: '',
        city: '',
        country: '',
        zipCode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formSubmit', formData);
        // if (formData.country !== 'IN') {
        //     alert('Please select Country Code.');
        //     return;
        // }
        axios.post("http://localhost:3001/register", formData)
        .then(result => {
            console.log(result);
     
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              address1: '',
              address2: '',
              state: '',
              city: '',
              country: '',
              zipCode: '',
            });
          })

        // .then(result => console.log(result))
        .catch(err => console.log(err))
        navigate("/userlist");
        // console.log('formSubmit', formData);
    };

    return (
        <div className="main__form">
            <form action="" className="form__container" onSubmit={handleSubmit}>
                <h1>Registration Form</h1>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="user__input"
                    placeholder="First Name"
                    required
                    minLength={5}
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="user__input"
                    placeholder="Last Name"
                    required
                    minLength={5}
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    id="email"
                    name="email"
                    className="user__input"
                    placeholder="Email ID"
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    value={formData.email}
                    onChange={handleChange}
                />


                <PhoneInput
                    id="mobile"
                    name="mobile"
                    className="user__input"
                    placeholder="Mobile NO"
                    required
                    value={formData.mobile}
                    onChange={(value) => {

                        if (value) {
                            const numericValue = value.replace(/\D/g, '');
                            setFormData({ ...formData, mobile: numericValue });
                        }
                    }}
                />

                <input
                    type="text"
                    id="address1"
                    name="address1"
                    className="user__input"
                    placeholder="Address1"
                    required
                    value={formData.address1}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="address2"
                    name="address2"
                    className="user__input"
                    placeholder="Address2"
                    value={formData.address2}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="state"
                    name="state"
                    className="user__input"
                    placeholder="State"
                    required
                    value={formData.state}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="city"
                    name="city"
                    className="user__input"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="country"
                    name="country"
                    className="user__input"
                    placeholder="Country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="user__input"
                    placeholder="Zip Code"
                    required
                    pattern="[0-9]+"
                    value={formData.zipCode}
                    onChange={handleChange}
                />

                <button className="submit__btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => ({
    addUser: (user) => dispatch(addUser(user)),
  });
  
  export default connect(null, mapDispatchToProps)(UserForm);