import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { getPatients, clearPatient } from '../../actinos/patient';

import PatientItem from './PatientItem';
import FilterPatient from './FilterPatient';

function Patients({
  getPatients,
  clearPatient,
  patient: { patients, patient, loading, filtered },
}) {
  useEffect(() => {
    if (!loading && patient) {
      clearPatient();
    }
    getPatients();
  }, [getPatients]);

  return (
    <>
      {!loading ? (
        <div className='container my-5'>
          <div className='row mb-4'>
            <h1>All Patients</h1>
          </div>
          <FilterPatient />
          <div className='row'>
            {patients.length > 0 ? (
              <>
                {filtered ? (
                  <>
                    {filtered.length > 0 ? (
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>Frist Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>City</th>
                            <th scope='col'>Sex</th>
                            <th scope='col'>Age</th>
                            <th scope='col'>Blood Group</th>
                            <th scope='col'>Phone Number</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        {filtered.map((patient) => (
                          <PatientItem key={patient.id} patient={patient} />
                        ))}
                        <ToastContainer />
                      </table>
                    ) : (
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>Frist Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>City</th>
                            <th scope='col'>Sex</th>
                            <th scope='col'>Age</th>
                            <th scope='col'>Blood Group</th>
                            <th scope='col'>Phone Number</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan='8'>No result for this search!</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th scope='col'>Frist Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>City</th>
                        <th scope='col'>Sex</th>
                        <th scope='col'>Age</th>
                        <th scope='col'>Blood Group</th>
                        <th scope='col'>Phone Number</th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    {patients.map((patient) => (
                      <PatientItem key={patient.id} patient={patient} />
                    ))}
                    <ToastContainer />
                  </table>
                )}
              </>
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
  clearPatient: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default connect(mapStateToProps, { getPatients, clearPatient })(
  Patients
);
