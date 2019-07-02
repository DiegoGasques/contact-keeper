import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/authContext";
import ContactsContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const { user, actions, isAuthenticated } = useContext(AuthContext);
  const contactContext = useContext(ContactsContext);

  const handleLogout = e => {
    actions.logout();
    contactContext.actions.clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>{`Hello ${user && user.name}`}</li>
      <li>
        <a href="#" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.string
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
};

export default Navbar;
