import React, { useState, useContext, useEffect } from "react";

import authContext from "../../context/auth/authContext";
import alertContext from "../../context/alert/alertContext";

const Login = props => {
  const AuthContext = useContext(authContext);
  const AlertContext = useContext(authContext);

  const { setAlert } = AlertContext.actions;
  const { login, clearErrors } = AuthContext.actions;

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

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

    if (email === "" || password === "") {
      setAlert("All fields must be filled", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
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
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
