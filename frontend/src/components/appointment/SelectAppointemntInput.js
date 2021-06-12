import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAppointments } from '../../actinos/appointment';

const SelectAppointmentInput = ({
  appointment: {
    appointments: { appointments },
    loading,
  },
  getAppointments,
}) => {
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <>
      {!loading &&
        appointments.rows.length &&
        appointments.rows.map((a) => (
          <option key={a.id} value={a.id}>
            Patient: {a.patient.first_name} {a.patient.last_name}, Date:{' '}
            {a.appointment_date}, Hour:
            {a.appointment_hour}
          </option>
        ))}
    </>
  );
};

SelectAppointmentInput.propTypes = {
  appointment: PropTypes.object.isRequired,
  getAppointments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getAppointments })(
  SelectAppointmentInput
);
