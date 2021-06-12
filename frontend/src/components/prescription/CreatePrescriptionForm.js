import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAppointmentById } from '../../actinos/appointment';
import { addPrescription } from '../../actinos/prescription';

function CreatePrescriptionModal({
  getAppointmentById,
  addPrescription,
  match,
  history,
  prescription: { prescription },
  appointment: { appointment, loading },
}) {
  const [formData, setFormData] = useState({
    date_presc: '',
  });

  const { date_presc } = formData;

  useEffect(() => {
    if (prescription.id) {
      history.push(
        `/dashboard/create_prescribed_medicament/${prescription.id}`
      );
      localStorage.setItem('app_id', match.params.id);
    }
    getAppointmentById(match.params.id);
  }, [getAppointmentById, match.params.id, prescription]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (date_presc === '') {
      return toast.error('Please enter the date of prescription!');
    }
    addPrescription(formData);
    setFormData({
      date_presc: '',
    });
    toast.success('We will redirect to write prescribed for this presciption!');
  };

  return (
    <div className='container'>
      <div className='d-flex my-3'></div>
      <div className='card'>
        <div className='card-body'>
          <h4 className='mb-5'>Create Preescription</h4>
          <form onSubmit={onSubmit}>
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <>
                {appointment && (
                  <>
                    <div className='form-group'>
                      <h6>Patient</h6>
                      <input
                        type='text'
                        className='form-control'
                        placeholder={`${appointment.patient.first_name} ${appointment.patient.last_name}`}
                        disabled
                      />
                    </div>
                    <div className='d-flex'>
                      <div className='form-group mr-auto'>
                        <h6>Age</h6>
                        <input
                          type='text'
                          className='form-control'
                          placeholder={`${appointment.patient.age}`}
                          disabled
                        />
                      </div>
                      <div className='form-group'>
                        <h6>Date</h6>
                        <input
                          type='date'
                          className='form-control'
                          name='date_presc'
                          value={date_presc}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            <div className='d-flex'>
              <input
                type='submit'
                className='btn btn-primary'
                value={'Create Prescription'}
              />
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

CreatePrescriptionModal.propTypes = {
  getAppointmentById: PropTypes.func.isRequired,
  addPrescription: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  prescription: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
  prescription: state.prescription,
});

export default connect(mapStateToProps, {
  getAppointmentById,
  addPrescription,
})(withRouter(CreatePrescriptionModal));
