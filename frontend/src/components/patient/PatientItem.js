import React from 'react';
import PropTypes from 'prop-types';

function PtientItem({ patient }) {
  const {
    id,
    first_name,
    last_name,
    sex,
    city,
    age,
    blood_group,
    phone_number,
  } = patient;
  return (
    <>
      <tbody>
        <tr>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{city}</td>
          <td>{sex}</td>
          <td>{age}</td>
          <td>{blood_group}</td>
          <td>{phone_number}</td>
        </tr>
      </tbody>
    </>
  );
}

PtientItem.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default PtientItem;
