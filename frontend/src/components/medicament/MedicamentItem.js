import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteMedicament } from '../../actinos/medicament';
import { Trash2, Edit3 } from 'react-feather';

function MedicamentItem({ medicament, deleteMedicament, history }) {
  const {
    id,
    name,
    createdAt,
    user: { full_name },
  } = medicament;

  const onDelete = () => {
    deleteMedicament(id);
    toast.info('Medicament deleted !');
  };

  const onEdit = () => {
    history.push(`/dashboard/create_medicament?medicament_id=${id}`);
  };
  return (
    <>
      <tbody>
        <tr>
          <td>{id}</td>
          <td>{full_name}</td>
          <td>{name}</td>
          <td>{createdAt}</td>
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

MedicamentItem.propTypes = {
  appointment: PropTypes.object.isRequired,
  deleteMedicament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteMedicament })(
  withRouter(MedicamentItem)
);
