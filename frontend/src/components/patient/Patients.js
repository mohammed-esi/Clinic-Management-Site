import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../../actinos/patient';

import PatientItem from './PatientItem';

function Patients({ getPatients, patient: { patients, loading } }) {
  useEffect(() => {
    getPatients();
  }, [getPatients]);
  return (
    <>
      {!loading ? (
        <div className='container my-5'>
          <div className='row my-5'>
            <Link to='/create_patient' className='btn btn-primary btn-block'>
              Create Patient
            </Link>
          </div>
          <div className='row'>
            {patients.length > 0 ? (
              <ul className='list-group list-group-flush'>
                {patients.map((patient) => (
                  <PatientItem key={patient.id} patient={patient} />
                ))}
              </ul>
            ) : (
              <p>There are no patients</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

Patients.propTypes = {
  getPatients: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default connect(mapStateToProps, { getPatients })(Patients);
