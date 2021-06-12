import React from 'react';
import PropTypes from 'prop-types';

function MedicamentItem({ medicament }) {
  const {
    id,
    name,
    createdAt,
    user: { full_name },
  } = medicament;
  return (
    <>
      <tbody>
        <tr>
          <td>{id}</td>
          <td>{full_name}</td>
          <td>{name}</td>
          <td>{createdAt}</td>
        </tr>
      </tbody>
    </>
  );
}

MedicamentItem.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default MedicamentItem;
