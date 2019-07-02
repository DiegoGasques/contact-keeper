import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from "../types";

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(c => c._id !== action.payload),
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c._id !== action.payload._id ? c : action.payload
        ),
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        current: null,
        error: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(c => {
          const regx = new RegExp(`${action.payload}`, "gi");
          return c.name.match(regx) || c.email.match(regx);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default contactReducer;
