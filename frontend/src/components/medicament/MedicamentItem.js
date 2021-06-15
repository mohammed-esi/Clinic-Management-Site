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
          <td>
            <div className='d-flex'>
              <button className='btn btn-danger mx-2'>
                <i class='fas fa-trash-alt'></i>
              </button>
              <button className='btn btn-info mx-2'>
                <i class='fas fa-edit'></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

MedicamentItem.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default MedicamentItem;
