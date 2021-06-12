import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAppointments } from '../../actinos/appointment';

import AppointmentItem from './AppointmentItem';

function Appointments({
  getAppointments,
  appointment: {
    appointments: { appointments },
    loading,
  },
}) {
  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  console.log(appointments);

  return (
    <>
      {!loading ? (
        <div className='container my-5'>
          <div className='row my-5'>
            <Link
              to='/dashboard/create_appointment'
              className='btn btn-primary btn-block'
            >
              Create Appointment
            </Link>
          </div>
          <div className='row mb-4'>
            <h1>All Appointments</h1>
          </div>
          <div className='row'>
            {appointments.rows.length > 0 ? (
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Hour</th>
                  </tr>
                </thead>
                {appointments.rows.map((appointment) => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </table>
            ) : (
              <p>There are no appointments</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

Appointments.propTypes = {
  getAppointments: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getAppointments })(Appointments);
