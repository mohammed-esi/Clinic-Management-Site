import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAppointment, getAppointments } from '../../actinos/appointment';

import SelectPatientInput from '../patient/SelectPatientInput';

function AppointmentForm({ addAppointment }) {
  const [formData, setFormData] = useState({
    id_patient: '',
    appointment_date: '',
    appointment_hour: '',
  });

  const { id_patient, appointment_date, appointment_hour } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);
    setFormData({
      id_patient: '',
      appointment_date: '',
      appointment_hour: '',
    });
    toast.success('Create new date!');
  };
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <h4>Patient</h4>
              <select
                name='id_patient'
                value={id_patient}
                className='form-control'
                onChange={onChange}
              >
                <option value='' disabled>
                  Choose...
                </option>
                <SelectPatientInput />
              </select>
            </div>
            <div className='form-group'>
              <h4>Date</h4>
              <input
                type='date'
                name='appointment_date'
                value={appointment_date}
                className='form-control'
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <h4>Hour</h4>
              <input
                type='time'
                name='appointment_hour'
                value={appointment_hour}
                className='form-control'
                onChange={onChange}
                required
              />
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

AppointmentForm.propTypes = {
  addAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addAppointment })(AppointmentForm);
