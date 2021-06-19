import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearPrescription } from '../../actinos/prescription';
import { addPrescribedMedicament } from '../../actinos/prescribed_medicament';

// Components
import SelectMedicamentsInput from '../medicament/SelectMedicamentsInput';
import PrescribedMedicaments from './PrescribedMedicaments';

function PrescripedMedicamentForm({
  clearPrescription,
  addPrescribedMedicament,
  match,
}) {
  const [formData, setFormData] = useState({
    prescription_id: match.params.id,
    medicament_id: '',
    dosage: '',
  });

  const { medicament_id, dosage } = formData;

  useEffect(() => {
    clearPrescription();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (dosage === '' || medicament_id === '') {
      return toast.error('Fill all Fields please!');
    }
    addPrescribedMedicament(formData);
    setFormData({
      prescription_id: match.params.id,
      medicament_id: '',
      dosage: '',
    });
    toast.success('Added new prescribed successfuly!');
  };

  return (
    <div className='container'>
      <div className='card my-3'>
        <div className='card-body'>
          <h4 className='mb-5'>Create Prescribed Medications</h4>
          <form onSubmit={onSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <h6>Choose Medicament</h6>
                  <select
                    name='medicament_id'
                    value={medicament_id}
                    className='form-control'
                    onChange={onChange}
                  >
                    <option value='' disabled>
                      Choose...
                    </option>
                    <SelectMedicamentsInput />
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <h6>Dosage</h6>
                  <input
                    type='text'
                    name='dosage'
                    value={dosage}
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <input
                type='submit'
                className='btn btn-primary'
                value={'Create Prescription'}
              />
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
      <div className='card my-3'>
        <div className='card-body'>
          <h4 className='mt-2 mb-4'>Prescribed Medicaments Of Prescription</h4>
          <div className='contianer my-2'>
            <PrescribedMedicaments />
          </div>
        </div>
      </div>
    </div>
  );
}

PrescripedMedicamentForm.propTypes = {
  clearPrescription: PropTypes.func.isRequired,
  addPrescribedMedicament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  clearPrescription,
  addPrescribedMedicament,
})(withRouter(PrescripedMedicamentForm));
