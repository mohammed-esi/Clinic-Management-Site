import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {
  clearConsultation,
  getConsultations,
} from '../../actinos/consultation';

import ConsultationItem from './ConsultationItem';
import FilterConsultations from './FilterConsultations';

function Consultations({
  getConsultations,
  clearConsultation,
  consultation: { consultations, loading, consultation, filtered },
}) {
  useEffect(() => {
    if (!loading && consultation) {
      clearConsultation();
    }
    getConsultations();
  }, [getConsultations]);

  return (
    <>
      {!loading ? (
        <div className='container my-5'>
          <div className='row mb-4'>
            <h1>All Consultaions</h1>
          </div>
          <FilterConsultations />
          <div className='row'>
            {consultations.length > 0 ? (
              <>
                {filtered ? (
                  <>
                    {filtered.length > 0 ? (
                      <>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th scope='col'>First Name</th>
                              <th scope='col'>Last Name</th>
                              <th scope='col'>Date</th>
                              <th scope='col'>Observation</th>
                              <th scope='col'>Motif</th>
                              <th scope='col'>Actions</th>
                            </tr>
                          </thead>
                          {filtered.map((consultation) => (
                            <ConsultationItem
                              key={consultation.id}
                              consultation={consultation}
                            />
                          ))}
                        </table>
                        <ToastContainer />
                      </>
                    ) : (
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Observation</th>
                            <th scope='col'>Motif</th>
                            <th scope='col'>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan='6'>No result for this search!</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>First Name</th>
                          <th scope='col'>Last Name</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Observation</th>
                          <th scope='col'>Motif</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </thead>
                      {consultations.map((consultation) => (
                        <ConsultationItem
                          key={consultation.id}
                          consultation={consultation}
                        />
                      ))}
                    </table>
                    <ToastContainer />
                  </>
                )}
              </>
            ) : (
              <p>There are no medicaments</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

Consultations.propTypes = {
  getConsultations: PropTypes.func.isRequired,
  clearConsultation: PropTypes.func.isRequired,
  consultation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  consultation: state.consultation,
});

export default connect(mapStateToProps, {
  getConsultations,
  clearConsultation,
})(Consultations);
