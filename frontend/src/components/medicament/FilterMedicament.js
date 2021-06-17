import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterMedicaments, clearFilter } from '../../actinos/medicament';
import { Activity } from 'react-feather';

function FilterMedicament({
  filterMedicaments,
  clearFilter,
  medicament: { filtered },
}) {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterMedicaments(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <div className='row my-5'>
      <div className='col-md-6'>
        <div className='form-group'>
          <input
            type='text'
            ref={text}
            onChange={onChange}
            placeholder='Find By Name....'
            className='form-control'
          />
        </div>
      </div>
      <div className='col-md-6 d-flex justify-content-end'>
        <Link
          to='/dashboard/create_medicament'
          className='btn btn-primary mb-3'
        >
          <Activity size={24} className='mr-2 mb-1' /> Create Medicament
        </Link>
      </div>
    </div>
  );
}

FilterMedicament.propTypes = {
  filterMedicaments: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  medicament: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  medicament: state.medicament,
});

export default connect(mapStateToProps, {
  filterMedicaments,
  clearFilter,
})(FilterMedicament);
