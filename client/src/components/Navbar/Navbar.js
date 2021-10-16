import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/authActions';
import { logout } from '../../actions/auth';
import './Navbar.css'
// import { clearCurrentProfile } from '../../actions/profileActions';

// class Navbar extends Component {
  // onLogoutClick(e) {
  //   e.preventDefault();
  //   // this.props.clearCurrentProfile();
  //   this.props.logoutUser();
  // }

  // render() {

  const Navbar = ({auth: {isAuthenticated}, logout}) => {
    // const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/ok1">
            ok1
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ok2">
            ok2
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="/"
            onClick={logout}
            className="nav-link"
          >
            {/* <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '} */}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Mu-Seak
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }


Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(
  Navbar
);