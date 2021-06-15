import React, { useState, useEffect } from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createMedicament } from '../../actinos/medicament';

function MedicamentForm({ createMedicament }) {
  // Get Querys
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  // useEffect(() => {
  //   if (appointment) {
  //     return setFormData({
  //       id_patient: appointment.patient_id,
  //       appointment_date: appointment.appointment_date,
  //       appointment_hour: appointment.appointment_hour,
  //     });
  //   }
  //   if (query.get('appointment_id')) {
  //     getAppointmentById(parseInt(query.get('appointment_id')));
  //   }
  // }, [getAppointmentById, appointment]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createMedicament(formData);
    setFormData({
      name: '',
    });
    toast.success('Create new medicament');
  };
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <h4>Name Medicament</h4>
              <input
                type='text'
                name='name'
                value={name}
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

MedicamentForm.propTypes = {
  createMedicament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createMedicament })(
  withRouter(MedicamentForm)
);
