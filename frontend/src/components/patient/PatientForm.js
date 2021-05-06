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
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='First Name'
                className='form-control'
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
                className='form-control'
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
                className='form-control'
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
                className='form-control'
                name='city'
                value={city}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <select
                name='sex'
                value={sex}
                className='form-control'
                onChange={onChange}
              >
                <option value='' disabled>
                  Choose The Gender....
                </option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email'
                className='form-control'
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
                className='form-control'
                name='phone_number'
                value={phone_number}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <select
                name='blood_group'
                value={blood_group}
                className='form-control'
                onChange={onChange}
              >
                <option value='' disabled>
                  Chose Blood Group....
                </option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
              </select>
            </div>
            <div className='d-flex'>
              <input
                type='submit'
                className='btn btn-primary'
                value={'Create'}
              />
              <Link to='/dashboard' className='btn btn-info ml-2'>
                Come Back
              </Link>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
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
