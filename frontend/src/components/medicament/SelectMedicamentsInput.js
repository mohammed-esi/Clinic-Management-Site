import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMedicaments } from '../../actinos/medicament';

const SelectMedicamentsInput = ({
  medicament: { medicaments, loading },
  getMedicaments,
}) => {
  useEffect(() => {
    getMedicaments();
  }, [getMedicaments]);
  return (
    <>
      {!loading &&
        medicaments.length &&
        medicaments.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
    </>
  );
};

SelectMedicamentsInput.propTypes = {
  medicament: PropTypes.object.isRequired,
  getMedicaments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  medicament: state.medicament,
});

export default connect(mapStateToProps, { getMedicaments })(
  SelectMedicamentsInput
);
