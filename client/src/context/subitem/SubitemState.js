import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import SubitemContext from './subitemContext';
import subitemReducer from './subitemReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

// Create a custom hook to use the subitem context

export const useSubitems = () => {
  const { state, dispatch } = useContext(SubitemContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux but they remain here for ease of students transitioning

// Get Subitems
export const getSubitems = async (dispatch) => {
  try {
    const res = await axios.get('/api/subitems');

    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Add Subitem
export const addSubitem = async (dispatch, subitem) => {
  try {
    const res = await axios.post('/api/subitems', subitem);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete Subitem
export const deleteSubitem = async (dispatch, id) => {
  try {
    await axios.delete(`/api/subitems/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Update Subitem
export const updateSubitem = async (dispatch, subitem) => {
  try {
    const res = await axios.put(`/api/subitems/${subitem._id}`, subitem);

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Clear Subitems
export const clearSubitems = (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
};

// Set Current Subitem
export const setCurrent = (dispatch, subitem) => {
  dispatch({ type: SET_CURRENT, payload: subitem });
};

// Clear Current Subitem
export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

// Filter Subitems
export const filterSubitems = (dispatch, text) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

const SubitemState = (props) => {
  const initialState = {
    subitems: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(subitemReducer, initialState);

  return (
    <SubitemContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </SubitemContext.Provider>
  );
};

export default SubitemState;
