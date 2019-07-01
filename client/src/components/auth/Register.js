import React, { useState, useContext, useEffect } from "react";

import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";

const Register = props => {
  const AlertContext = useContext(alertContext);
  const AuthContext = useContext(authContext);

  const { setAlert } = AlertContext.actions;
  const { register, clearErrors } = AuthContext.actions;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (AuthContext.isAuthenticated) {
      props.history.push("/");
    }

    if (AuthContext.error) {
      setAlert(AuthContext.error, "danger", 10000);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [AuthContext.error, AuthContext.isAuthenticated, props.history]);

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Password confirmation incorrect", "danger");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password </label>
          <input
            type="text"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
