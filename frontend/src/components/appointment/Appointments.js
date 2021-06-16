import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAppointments, clearAppointment } from '../../actinos/appointment';

import AppointmentItem from './AppointmentItem';
import FilterAppointmet from './FilterAppointmet';

function Appointments({
  getAppointments,
  clearAppointment,
  appointment: { appointments, appointment, loading, filtered },
}) {
  useEffect(() => {
    if (!loading && appointment) {
      clearAppointment();
    }
    getAppointments();
  }, [getAppointments]);

  return (
    <>
      {!loading ? (
        <div className='container my-5'>
          <div className='row mb-4'>
            <h1>All Appointments</h1>
          </div>
          <FilterAppointmet />
          <div className='row'>
            {appointments.length > 0 ? (
              <>
                {filtered ? (
                  <>
                    {filtered.length > 0 ? (
                      <>
                        <table className='table table-bordered'>
                          <thead>
                            <tr>
                              <th scope='col'>First Name</th>
                              <th scope='col'>Last Name</th>
                              <th scope='col'>Date</th>
                              <th scope='col'>Hour</th>
                              <th scope='col'>actions</th>
                            </tr>
                          </thead>
                          {filtered.map((appointment) => (
                            <AppointmentItem
                              key={appointment.id}
                              appointment={appointment}
                            />
                          ))}
                        </table>
                        <ToastContainer />
                      </>
                    ) : (
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Hour</th>
                            <th scope='col'>actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan='5'>No result for this search!</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th scope='col'>First Name</th>
                          <th scope='col'>Last Name</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Hour</th>
                          <th scope='col'>actions</th>
                        </tr>
                      </thead>
                      {appointments.map((appointment) => (
                        <AppointmentItem
                          key={appointment.id}
                          appointment={appointment}
                        />
                      ))}
                    </table>
                    <ToastContainer />
                  </>
                )}
              </>
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
  clearAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getAppointments, clearAppointment })(
  Appointments
);
