import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPatient } from '../../actinos/patient';

function PtientForm({ addPatient, error }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    sex: '',
    city: '',
    email: '',
    phone_number: '',
    blood_group: '',
  });

  const {
    first_name,
    last_name,
    age,
    city,
    email,
    sex,
    phone_number,
    blood_group,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPatient(formData);
    setFormData({
      first_name: '',
      last_name: '',
      age: 0,
      sex: '',
      city: '',
      email: '',
      phone_number: '',
      blood_group: '',
    });
    toast.success('Patient has been created !');
  };
  return (
    <div className='container my-5'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='First Name'
            name='first_name'
            value={first_name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='last_name'
            placeholder='Last Name'
            name='last_name'
            value={last_name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Your Age'
            name='age'
            value={age}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={city}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Sex'
            name='sex'
            value={sex}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Phone Number'
            name='phone_number'
            value={phone_number}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Blood Group'
            name='blood_group'
            value={blood_group}
            onChange={onChange}
            required
          />
        </div>
        <div className='d-flex'>
          <input type='submit' className='btn btn-primary' value={'Create'} />
          <Link to='/' className='btn btn-info ml-2'>
            Come Back
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

PtientForm.propTypes = {
  addPatient: PropTypes.func.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = (state) => ({
  error: state.patient.error,
});

export default connect(mapStateToProps, { addPatient })(PtientForm);
