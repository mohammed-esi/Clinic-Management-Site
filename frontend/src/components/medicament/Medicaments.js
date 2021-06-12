import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMedicaments } from '../../actinos/medicament';

import MedicamentItem from './MedicamentItem';

function Medicaments({ getMedicaments, medicament: { medicaments, loading } }) {
  useEffect(() => {
    getMedicaments();
  }, [getMedicaments]);

  return (
    <>
      {!loading ? (
        <div className='container my-5'>
          <div className='row my-5'>
            <Link
              to='/dashboard/create_appointment'
              className='btn btn-primary btn-block'
            >
              Create Medicament
            </Link>
          </div>
          <div className='row mb-4'>
            <h1>All Medicaments</h1>
          </div>
          <div className='row'>
            {medicaments.length > 0 ? (
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>/</th>
                    <th scope='col'>Doctor / Secretary</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Date</th>
                  </tr>
                </thead>
                {medicaments.map((medicament) => (
                  <MedicamentItem key={medicament.id} medicament={medicament} />
                ))}
              </table>
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
  medicament: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  medicament: state.medicament,
});

export default connect(mapStateToProps, { getMedicaments })(Medicaments);
