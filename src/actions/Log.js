import fetch from "isomorphic-fetch";
import { createGenericError } from "./Helpers";

/*******************************************************************************
  ProcessLog
*******************************************************************************/
export const REQUEST_PROCESS_LOG = "REQUEST_PROCESS_LOG";
export function requestProcessLog(name) {
  return {
    type : REQUEST_PROCESS_LOG,
    name : name
  };
}

export const RECEIVE_PROCESS_LOG = "RECEIVE_PROCESS_LOG";
export function receiveProcessLog(name, json, status) {
  return {
    type : RECEIVE_PROCESS_LOG,
    name : name,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export const RECEIVE_PROCESS_LOG_ERROR = "RECEIVE_PROCESS_LOG_ERROR";
export function receiveProcessLogError(name, error) {
  return {
    type : RECEIVE_PROCESS_LOG_ERROR,
    name : name,
    response : null,
    status : null,
    error: error,
    receivedAt : Date.now()
  };
}

export function fetchProcessLog(name) {
  return dispatch => {
    dispatch(requestProcessLog(name));
    return fetch("http://127.0.0.1:30000/api/controller/processes/" + name + "/log")
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receiveProcessLog(name, jsonResponse.json, jsonResponse.status));
          });
      })
      .catch(err => {
        dispatch(receiveProcessLogError(name, createGenericError(err)));
      });
  };
}

export function doFetchProcessLog(name) {
  return (dispatch, getState) => {
    return fetchProcessLog(name);
  };
}
