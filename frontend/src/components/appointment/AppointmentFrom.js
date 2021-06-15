import React, { useState, useEffect } from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addAppointment,
  getAppointmentById,
  updateAppointment,
} from '../../actinos/appointment';

import SelectPatientInput from '../patient/SelectPatientInput';

function AppointmentForm({
  addAppointment,
  getAppointmentById,
  updateAppointment,
  appointment: { appointment },
  history,
}) {
  // Get Querys
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const [formData, setFormData] = useState({
    id_patient: '',
    appointment_date: '',
    appointment_hour: '',
  });

  const { id_patient, appointment_date, appointment_hour } = formData;

  useEffect(() => {
    if (appointment) {
      return setFormData({
        id_patient: appointment.patient_id,
        appointment_date: appointment.appointment_date,
        appointment_hour: appointment.appointment_hour,
      });
    }
    if (query.get('appointment_id')) {
      getAppointmentById(parseInt(query.get('appointment_id')));
    }
  }, [getAppointmentById, appointment]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (query.get('appointment_id')) {
      updateAppointment(parseInt(query.get('appointment_id')), formData);
      toast.info('Update date!');
      setTimeout(() => {
        history.push('/dashboard/appointments');
      }, 2000);
    } else {
      addAppointment(formData);
      toast.success('Create new date!');
    }
    setFormData({
      id_patient: '',
      appointment_date: '',
      appointment_hour: '',
    });
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
                value={query.get('appointment_id') ? 'Edit' : 'Create'}
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
  getAppointmentById: PropTypes.func.isRequired,
  updateAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, {
  addAppointment,
  getAppointmentById,
  updateAppointment,
})(withRouter(AppointmentForm));
