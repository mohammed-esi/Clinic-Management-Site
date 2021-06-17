import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, clearError } from '../../actinos/auth';

import logo from '../../assets/images/logo.png';

function Login({
  login,
  clearError,
  auth: { error, isAuthenticated, loading },
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard/patients' />;
  }
  return (
    <>
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <img
            src={logo}
            className='img-fluid'
            width={'100px'}
            height={'100px'}
          />
        </div>
        <div className='row'>
          <div className='col-6 offset-3'>
            <div className='card my-5'>
              <div className='card-body'>
                <div className='d-flex justify-content-center mt-2 mb-5'>
                  <h1>Login</h1>
                </div>
                <form onSubmit={onSubmit}>
                  <div className='form-group mb-4'>
                    <input
                      type='email'
                      name='email'
                      value={email}
                      className='form-control'
                      placeholder='Enter email'
                      onChange={onChange}
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <input
                      type='password'
                      name='password'
                      value={password}
                      className='form-control'
                      placeholder='Enter password'
                      onChange={onChange}
                    />
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button type='submit' className='btn btn-primary mb-2 px-5'>
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, clearError })(Login);
