import React, { useReducer } from "react";
import uuid from "uuid";

import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT
} from "../types";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Diego Gasques",
        email: "diego@email.com",
        type: "personal",
        phone: "999-983-3723"
      },
      {
        id: 2,
        name: "Nino Siradze",
        email: "nini@email.com",
        type: "professional",
        phone: "444-444-3423"
      },
      {
        id: 3,
        name: "Jane Doe",
        email: "Jane@email.com",
        type: "professional",
        phone: "133-333-3723"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {children}
    </contactContext.Provider>
  );
};

export default ContactState;
