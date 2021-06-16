import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterConsultations, clearFilter } from '../../actinos/consultation';

function FilterConsultations({
  filterConsultations,
  clearFilter,
  consultation: { filtered },
}) {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterConsultations(e.target.value);
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
            placeholder='Find By Patient....'
            className='form-control'
          />
        </div>
      </div>
      <div className='col-md-6 d-flex justify-content-end'>
        <Link
          to='/dashboard/choose_appointment'
          className='btn btn-primary mb-3'
        >
          Create Consultation
        </Link>
      </div>
    </div>
  );
}

FilterConsultations.propTypes = {
  filterConsultations: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  consultation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  consultation: state.consultation,
});

export default connect(mapStateToProps, {
  filterConsultations,
  clearFilter,
})(FilterConsultations);
