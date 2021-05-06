import React from 'react';
import PropTypes from 'prop-types';

function AppointmentItem({ appointment }) {
  const {
    appointment_date,
    appointment_hour,
    patient: { first_name, last_name },
  } = appointment;
  return (
    <>
      <tbody>
        <tr>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{appointment_date}</td>
          <td>{appointment_hour}</td>
        </tr>
      </tbody>
    </>
  );
}

AppointmentItem.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default AppointmentItem;
