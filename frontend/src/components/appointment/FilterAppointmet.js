import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterAppointments, clearFilter } from '../../actinos/appointment';
import { Calendar } from 'react-feather';

function FilterAppointmet({
  filterAppointments,
  clearFilter,
  appointment: { filtered },
}) {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterAppointments(e.target.value);
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
          to='/dashboard/create_appointment'
          className='btn btn-primary mb-3'
        >
          <Calendar size={24} className='mr-2 mb-1' /> Create Appointment
        </Link>
      </div>
    </div>
  );
}

FilterAppointmet.propTypes = {
  filterAppointments: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, {
  filterAppointments,
  clearFilter,
})(FilterAppointmet);
