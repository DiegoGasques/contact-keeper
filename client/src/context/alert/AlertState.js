import React, { useReducer } from "react";
import uuid from "uuid";

import alertReducer from "./alertReducer";
import alertContext from "./alertContext";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = ({ children }) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, timeout);
  };

  return (
    <alertContext.Provider
      value={{
        alerts: state,
        actions: {
          setAlert
        }
      }}
    >
      {children}
    </alertContext.Provider>
  );
};

export default AlertState;
