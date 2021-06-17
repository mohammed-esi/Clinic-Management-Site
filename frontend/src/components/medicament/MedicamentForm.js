import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createMedicament,
  getMeidcamentById,
  updateMedicament,
} from '../../actinos/medicament';

function MedicamentForm({
  createMedicament,
  getMeidcamentById,
  updateMedicament,
  history,
  medicament: { medicament },
}) {
  // Get Querys
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  useEffect(() => {
    if (medicament) {
      return setFormData({
        name: medicament.name,
      });
    }
    if (query.get('medicament_id')) {
      getMeidcamentById(parseInt(query.get('medicament_id')));
    }
  }, [getMeidcamentById, medicament]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (query.get('medicament_id')) {
      updateMedicament(parseInt(query.get('medicament_id')), formData);
      toast.info('Updated successfuly!');
      setTimeout(() => {
        history.push('/dashboard/medicaments');
      }, 2000);
    } else {
      createMedicament(formData);
      toast.success('Create new medicament');
    }
    setFormData({
      name: '',
    });
  };
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <h4>Name Medicament</h4>
              <input
                type='text'
                name='name'
                value={name}
                className='form-control'
                onChange={onChange}
                required
              />
            </div>
            <div className='d-flex'>
              <input
                type='submit'
                className='btn btn-primary'
                value={query.get('medicament_id') ? 'Edit' : 'Create'}
              />
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

MedicamentForm.propTypes = {
  createMedicament: PropTypes.func.isRequired,
  getMeidcamentById: PropTypes.func.isRequired,
  updateMedicament: PropTypes.func.isRequired,
  medicament: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  medicament: state.medicament,
});

export default connect(mapStateToProps, {
  createMedicament,
  getMeidcamentById,
  updateMedicament,
})(withRouter(MedicamentForm));
