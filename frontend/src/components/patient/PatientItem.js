import React from 'react';
import PropTypes from 'prop-types';

function PtientItem({ patient }) {
  const { first_name, last_name } = patient;
  return (
    <>
      <li className='list-group-item'>
        {first_name} {last_name}
      </li>
    </>
  );
}

PtientItem.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default PtientItem;
