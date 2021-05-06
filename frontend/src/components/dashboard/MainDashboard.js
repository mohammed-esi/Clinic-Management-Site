import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function MainPage({ auth: { user } }) {
  return <>{user && <h1>Hello {user.full_name}</h1>}</>;
}

MainPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(MainPage);
