import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { getMedicaments, clearMeidcament } from '../../actinos/medicament';

import MedicamentItem from './MedicamentItem';
import FilterMedicament from './FilterMedicament';

function Medicaments({
  getMedicaments,
  clearMeidcament,
  medicament: { medicaments, medicament, loading, filtered },
}) {
  useEffect(() => {
    if (!loading && medicament) {
      clearMeidcament();
    }
    getMedicaments();
  }, [getMedicaments]);

  return (
    <>
      {!loading ? (
        <div className='container my-5'>
          <div className='row mb-4'>
            <h1>All Medicaments</h1>
          </div>
          <FilterMedicament />
          <div className='row'>
            {medicaments.length > 0 ? (
              <>
                {filtered ? (
                  <>
                    {filtered.length > 0 ? (
                      <>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th scope='col'>/</th>
                              <th scope='col'>Doctor / Secretary</th>
                              <th scope='col'>Name</th>
                              <th scope='col'>Date</th>
                              <th scope='col'>Action</th>
                            </tr>
                          </thead>
                          {filtered.map((medicament) => (
                            <MedicamentItem
                              key={medicament.id}
                              medicament={medicament}
                            />
                          ))}
                        </table>
                        <ToastContainer />
                      </>
                    ) : (
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>/</th>
                            <th scope='col'>Doctor / Secretary</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan='5'>No result for this search!</td>
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
                          <th scope='col'>/</th>
                          <th scope='col'>Doctor / Secretary</th>
                          <th scope='col'>Name</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      {medicaments.map((medicament) => (
                        <MedicamentItem
                          key={medicament.id}
                          medicament={medicament}
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

Medicaments.propTypes = {
  getMedicaments: PropTypes.func.isRequired,
  clearMeidcament: PropTypes.func.isRequired,
  medicament: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  medicament: state.medicament,
});

export default connect(mapStateToProps, { getMedicaments, clearMeidcament })(
  Medicaments
);
