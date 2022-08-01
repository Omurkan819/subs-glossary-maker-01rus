import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from '../types';

const subitemReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        subitems: action.payload
      };
    case ADD_CONTACT:
      return {
        ...state,
        subitems: [action.payload, ...state.subitems]
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        subitems: state.subitems.map((subitem) =>
          subitem._id === action.payload._id ? action.payload : subitem
        )
      };
    case DELETE_CONTACT:
      return {
        ...state,
        subitems: state.subitems.filter(
          (subitem) => subitem._id !== action.payload
        )
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        subitems: null,
        filtered: null,
        error: null,
        current: null
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
        filtered: state.subitems.filter(({ subtitle, translation }) => {
          const testString = `${subtitle}${translation}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
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
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default subitemReducer;
