import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteConsultation } from '../../actinos/consultation';
import { Trash2, Edit3 } from 'react-feather';

function ConsultationItem({ consultation, deleteConsultation, history }) {
  const {
    id,
    motif,
    observation,
    appointment: {
      appointment_date,
      patient: { first_name, last_name },
    },
  } = consultation;

  const onDelete = () => {
    deleteConsultation(id);
    toast.info('Consultation deleted !');
  };

  const onEdit = () => {
    history.push(`/dashboard/create_consultation/${id}?edit=${true}`);
  };

  return (
    <>
      <tbody>
        <tr>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{appointment_date}</td>
          <td>{observation}</td>
          <td>{motif}</td>
          <td>
            <div className='d-flex'>
              <button className='btn btn-danger mx-2' onClick={onDelete}>
                <Trash2 />
              </button>
              <button className='btn btn-info mx-2' onClick={onEdit}>
                <Edit3 />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

ConsultationItem.propTypes = {
  consultation: PropTypes.object.isRequired,
  deleteConsultation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteConsultation })(
  withRouter(ConsultationItem)
);
