import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPatient, getPatientById } from '../../actinos/patient';
import { updatePatient } from '../../actinos/patient';

function PtientForm({
  addPatient,
  getPatientById,
  patient: { patient, error },
  updatePatient,
  history,
}) {
  // Get Querys
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

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

  useEffect(() => {
    if (patient) {
      return setFormData({
        first_name: patient ? patient.first_name : '',
        last_name: patient ? patient.last_name : '',
        age: patient ? patient.age : 0,
        sex: patient ? patient.sex : '',
        city: patient ? patient.city : '',
        email: patient ? patient.email : '',
        phone_number: patient ? patient.phone_number : '',
        blood_group: patient ? patient.blood_group : '',
      });
    }
    if (query.get('patient_id')) {
      getPatientById(parseInt(query.get('patient_id')));
    }
  }, [getPatientById, patient]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (error) return toast.error(error);
    if (query.get('patient_id')) {
      updatePatient(parseInt(query.get('patient_id')), formData);
      toast.info('Update successfuly');
      setTimeout(() => {
        history.push('/dashboard/patients');
      }, 2000);
    } else {
      addPatient(formData);
      toast.success('Patient has been created !');
    }
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
                value={query.get('patient_id') ? 'Edit' : 'Create'}
              />
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
  getPatientById: PropTypes.func.isRequired,
  updatePatient: PropTypes.func.isRequired,
  error: PropTypes.object,
  patient: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default connect(mapStateToProps, {
  addPatient,
  getPatientById,
  updatePatient,
})(withRouter(PtientForm));
