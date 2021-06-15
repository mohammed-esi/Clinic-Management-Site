import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deletePatient } from '../../actinos/patient';

function PtientItem({ patient, deletePatient, history }) {
  const {
    id,
    first_name,
    last_name,
    sex,
    city,
    age,
    blood_group,
    phone_number,
  } = patient;

  const onDelete = () => {
    deletePatient(id);
    toast.info('Patient deleted !');
  };

  const onEdit = () => {
    history.push(`/dashboard/create_patient?patient_id=${id}`);
  };
  return (
    <>
      <tbody>
        <tr>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{city}</td>
          <td>{sex}</td>
          <td>{age}</td>
          <td>{blood_group}</td>
          <td>{phone_number}</td>
          <td>
            <div className='d-flex'>
              <button className='btn btn-danger mx-2' onClick={onDelete}>
                <i class='fas fa-trash-alt'></i>
              </button>
              <button className='btn btn-info mx-2' onClick={onEdit}>
                <i class='fas fa-edit'></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

PtientItem.propTypes = {
  patient: PropTypes.object.isRequired,
  deletePatient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deletePatient })(
  withRouter(PtientItem)
);
