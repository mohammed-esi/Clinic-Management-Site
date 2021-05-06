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
            <Link
              to='/dashboard/create_patient'
              className='btn btn-primary btn-block'
            >
              Create Patient
            </Link>
          </div>
          <div className='row mb-4'>
            <h1>All Patient</h1>
          </div>
          <div className='row'>
            {patients.length > 0 ? (
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Frist Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>City</th>
                    <th scope='col'>Sex</th>
                    <th scope='col'>Age</th>
                    <th scope='col'>Blood Group</th>
                    <th scope='col'>Phone Number</th>
                  </tr>
                </thead>
                {patients.map((patient) => (
                  <PatientItem key={patient.id} patient={patient} />
                ))}
              </table>
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
