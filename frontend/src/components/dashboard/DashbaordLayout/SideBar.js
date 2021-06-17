import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actinos/auth';
import PropTypes from 'prop-types';

import logo from '../../../assets/images/logo.png';

const Sidebar = ({ logout }) => {
  return (
    <nav id='sidebar'>
      <div className='sidebar-header'>
        <div className='d-flex justify-content-center'>
          <img src={logo} className='img-fluid w-50 h-50' />
        </div>
      </div>

      <ul className='list-unstyled components'>
        <li>
          <Link className='sidebar-link' to='/dashboard/patients'>
            Patients
          </Link>
        </li>
        <li>
          <Link className='sidebar-link' to='/dashboard/appointments'>
            Appointments
          </Link>
        </li>
        <li>
          <Link className='sidebar-link' to='/dashboard/medicaments'>
            Medicaments
          </Link>
        </li>
        <li>
          <Link className='sidebar-link' to='/dashboard/consultations'>
            Consultations
          </Link>
        </li>
        <li>
          <a href='#!' onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(Sidebar);
