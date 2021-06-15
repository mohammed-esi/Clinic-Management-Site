import React, { useEffect, useState } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAppointmentById } from '../../actinos/appointment';
import {
  createConsultation,
  getConsultationById,
  updateConsultation,
} from '../../actinos/consultation';

function ConsultationForm({
  getAppointmentById,
  createConsultation,
  getConsultationById,
  updateConsultation,
  match,
  history,
  consultation: { consultation },
  appointment: { appointment, loading },
}) {
  // Get Querys
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const [formData, setFormData] = useState({
    app_id: match.params.id,
    prescription_id: query.get('prescription_id')
      ? parseInt(query.get('prescription_id'))
      : null,
    motif: '',
    observation: '',
  });

  const { motif, observation } = formData;

  useEffect(() => {
    if (consultation) {
      return setFormData({
        ...formData,
        motif: consultation.motif,
        observation: consultation.observation,
      });
    }
    if (query.get('edit')) {
      getConsultationById(match.params.id);
    } else {
      getAppointmentById(match.params.id);
    }
  }, [getAppointmentById, getConsultationById, consultation, match.params.id]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (motif === '' || observation === '') {
      return toast.error('Fill all fields!');
    }
    if (query.get('edit')) {
      updateConsultation(match.params.id, formData);
      toast.success(`Update successfuly!`);
    } else {
      createConsultation(formData);
      toast.success(
        `Create Consultation with ${appointment.patient.first_name} succress!`
      );
      localStorage.removeItem('app_id');
    }
    setFormData({
      motif: '',
      observation: '',
    });
    setTimeout(() => {
      history.push('/dashboard/consultations');
    }, 2000);
  };

  return (
    <div className='container'>
      <div className='d-flex my-3'>
        {query.get('edit') ? (
          <>
            {consultation && (
              <>
                <div className='mr-auto'>
                  Patient :{' '}
                  <b>
                    {consultation.appointment.patient.first_name}{' '}
                    {consultation.appointment.patient.last_name}
                  </b>{' '}
                  / Age : <b>{consultation.appointment.patient.age}</b> years
                  old
                </div>
                <div className=''>
                  Date: <b>{consultation.appointment.appointment_date}</b> /
                  Hour: <b>{consultation.appointment.appointment_hour}</b>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <>
                {appointment && (
                  <>
                    <div className='mr-auto'>
                      Patient :{' '}
                      <b>
                        {appointment.patient.first_name}{' '}
                        {appointment.patient.last_name}
                      </b>{' '}
                      / Age : <b>{appointment.patient.age}</b> years old
                    </div>
                    <div className=''>
                      Date: <b>{appointment.appointment_date}</b> / Hour:{' '}
                      <b>{appointment.appointment_hour}</b>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className='card'>
        <div className='card-body'>
          {query.get('edit') ? (
            <h4 className='mb-5'>Edit Consultation</h4>
          ) : (
            <div className='d-flex mb-5'>
              <h4 className='mr-auto'>Create Consultation</h4>
              <Link
                className='btn btn-info'
                to={`/dashboard/create_prescription/${match.params.id}`}
              >
                Add Prescription
              </Link>
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <h4>Motif</h4>
              <input
                type='text'
                name='motif'
                value={motif}
                className='form-control'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <h4>Observation</h4>
              <textarea
                class='form-control'
                name='observation'
                value={observation}
                rows='3'
                onChange={onChange}
              ></textarea>
            </div>
            <div className='d-flex'>
              <input
                type='submit'
                className='btn btn-primary'
                value={
                  query.get('edit')
                    ? 'Edit Consultation'
                    : 'Create Consultation'
                }
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

ConsultationForm.propTypes = {
  getAppointmentById: PropTypes.func.isRequired,
  createConsultation: PropTypes.func.isRequired,
  getConsultationById: PropTypes.func.isRequired,
  updateConsultation: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  consultation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
  consultation: state.consultation,
});

export default connect(mapStateToProps, {
  getAppointmentById,
  createConsultation,
  getConsultationById,
  updateConsultation,
})(withRouter(ConsultationForm));
