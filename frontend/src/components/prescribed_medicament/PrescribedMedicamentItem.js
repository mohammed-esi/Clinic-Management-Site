import React from 'react';
import PropTypes from 'prop-types';

function PrescribedMedicamentItem({ prescribed_medicament }) {
  const {
    dosage,
    medicament: { name },
  } = prescribed_medicament;
  return (
    <li class='list-group-item'>
      {name} / {dosage}
    </li>
  );
}

PrescribedMedicamentItem.propTypes = {
  prescribed_medicament: PropTypes.object,
};

export default PrescribedMedicamentItem;
