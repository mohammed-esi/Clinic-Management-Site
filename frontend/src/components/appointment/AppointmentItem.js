import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { deleteAppointment } from '../../actinos/appointment';

function AppointmentItem({ appointment, deleteAppointment, history }) {
  const {
    id,
    appointment_date,
    appointment_hour,
    patient: { first_name, last_name },
  } = appointment;

  const onDelete = () => {
    deleteAppointment(id);
    toast.info('Appointment deleted !');
  };

  const onEdit = () => {
    history.push(`/dashboard/create_appointment?appointment_id=${id}`);
  };
  return (
    <>
      <tbody>
        <tr>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{appointment_date}</td>
          <td>{appointment_hour}</td>
          <td>
            <div className='d-flex'>
              <button className='btn btn-danger mx-2' onClick={onDelete}>
                <i class='fas fa-trash-alt'></i>
              </button>
              <button className='btn btn-info mx-2' onClick={onEdit}>
                <i class='fas fa-edit'></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

AppointmentItem.propTypes = {
  appointment: PropTypes.object.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteAppointment })(
  withRouter(AppointmentItem)
);
