import React from 'react';
import PropTypes from 'prop-types';

function ConsultationItem({ consultation }) {
  const {
    motif,
    observation,
    appointment: {
      appointment_date,
      patient: { first_name, last_name },
    },
  } = consultation;
  return (
    <>
      <tbody>
        <tr>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{appointment_date}</td>
          <td>{observation}</td>
          <td>{motif}</td>
        </tr>
      </tbody>
    </>
  );
}

ConsultationItem.propTypes = {
  appointment: PropTypes.object,
};

export default ConsultationItem;
