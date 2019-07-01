import React, { useReducer } from "react";
import axios from "axios";

import authReducer from "./authReducer";
import authContext from "./authContext";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS,
  USER_LOADED
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async formData => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg
      });
    }
  };

  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (e) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        actions: {
          register,
          clearErrors,
          loadUser
        }
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
