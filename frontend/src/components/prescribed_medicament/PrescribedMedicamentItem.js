import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deletePrescribedMedicament } from '../../actinos/prescribed_medicament';

function PrescribedMedicamentItem({
  prescribed_medicament,
  deletePrescribedMedicament,
}) {
  const {
    id,
    dosage,
    medicament: { name },
  } = prescribed_medicament;

  const onDelete = () => {
    deletePrescribedMedicament(id);
    toast.info('Prescribed medicament deleted !');
  };

  return (
    <>
      <li class='list-group-item d-flex justify-content-between align-items-center'>
        {name} / {dosage}
        <button className='btn btn-danger' onClick={onDelete}>
          <i class='fas fa-trash-alt'></i>
        </button>
      </li>
      <ToastContainer />
    </>
  );
}

PrescribedMedicamentItem.propTypes = {
  prescribed_medicament: PropTypes.object,
  deletePrescribedMedicament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deletePrescribedMedicament })(
  PrescribedMedicamentItem
);
