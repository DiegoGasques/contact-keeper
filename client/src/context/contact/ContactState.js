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
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };

  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  };

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        actions: {
          addContact,
          deleteContact,
          setCurrent,
          clearCurrent,
          updateContact,
          filterContacts,
          clearFilter
        }
      }}
    >
      {children}
    </contactContext.Provider>
  );
};

export default ContactState;
