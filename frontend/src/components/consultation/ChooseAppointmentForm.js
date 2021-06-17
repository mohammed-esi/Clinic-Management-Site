import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SelectAppointmentInput from '../appointment/SelectAppointemntInput';

function ChooseAppointmentForm(props) {
  const [formData, setFormData] = useState({
    app_id: '',
  });

  const { app_id } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (app_id === '') {
      return toast.error('Please choose one of appointments at selector!');
    }
    props.history.push(`/dashboard/create_consultation/${app_id}`);
  };
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <h4>Choose Appointment</h4>
              <select
                name='app_id'
                value={app_id}
                className='form-control'
                onChange={onChange}
              >
                <option value='' disabled>
                  Choose...
                </option>
                <SelectAppointmentInput />
              </select>
            </div>
            <div className='d-flex'>
              <input
                type='submit'
                className='btn btn-primary'
                value={'Create Consultation'}
              />
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChooseAppointmentForm);
