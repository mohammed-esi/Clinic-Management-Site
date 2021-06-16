import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterPatients, clearFilter } from '../../actinos/patient';

function FilterPatient({ filterPatients, clearFilter, patient: { filtered } }) {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPatients(e.target.value);
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
            placeholder='Find By Patient....'
            className='form-control'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='col-md-6 d-flex justify-content-end'>
        <Link to='/dashboard/create_patient' className='btn btn-primary mb-3'>
          Create Patient
        </Link>
      </div>
    </div>
  );
}

FilterPatient.propTypes = {
  filterPatients: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default connect(mapStateToProps, {
  filterPatients,
  clearFilter,
})(FilterPatient);
