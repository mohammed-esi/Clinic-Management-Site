import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients } from '../../actinos/patient';

const SelectPatientInput = ({
  patient: { patients, loading },
  getPatients,
}) => {
  useEffect(() => {
    getPatients();
  }, []);
  return (
    !loading &&
    patients.map((p) => (
      <option key={p.id} value={p.id}>
        {p.first_name} {p.last_name}
      </option>
    ))
  );
};

SelectPatientInput.propTypes = {
  patient: PropTypes.object.isRequired,
  getPatients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default connect(mapStateToProps, { getPatients })(SelectPatientInput);
