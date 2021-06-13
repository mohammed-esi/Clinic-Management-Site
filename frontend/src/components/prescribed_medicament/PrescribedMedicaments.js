import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPrescribedMedicaments } from '../../actinos/prescribed_medicament';

import PrescribedMedicamentItem from './PrescribedMedicamentItem';

function PrescribedMedicaments({
  getPrescribedMedicaments,
  match,
  prescribed_medicament: { prescribed_medicaments, loading },
}) {
  useEffect(() => {
    getPrescribedMedicaments(match.params.id);
  }, [getPrescribedMedicaments, match.params.id]);

  return (
    <>
      <ul className='list-group'>
        {!loading ? (
          <>
            {prescribed_medicaments.length > 0 ? (
              <>
                {prescribed_medicaments.map((prescribed_medicament) => (
                  <PrescribedMedicamentItem
                    key={prescribed_medicament.id}
                    prescribed_medicament={prescribed_medicament}
                  />
                ))}
              </>
            ) : (
              <h6>No prescirbed medicament aded!</h6>
            )}
          </>
        ) : (
          <h6>Loading ...</h6>
        )}
      </ul>
      <div className='d-flex my-4'>
        <Link
          to={`/dashboard/create_consultation/${localStorage.getItem(
            'app_id'
          )}?prescription_id=${match.params.id}`}
          className='btn btn-info'
        >
          Done
        </Link>
      </div>
    </>
  );
}

PrescribedMedicaments.propTypes = {
  getPrescribedMedicaments: PropTypes.func.isRequired,
  prescribed_medicament: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  prescribed_medicament: state.prescribed_medicament,
});

export default connect(mapStateToProps, {
  getPrescribedMedicaments,
})(withRouter(PrescribedMedicaments));
