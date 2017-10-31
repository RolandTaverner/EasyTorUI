import fetch from "isomorphic-fetch";
import { createGenericError, delay } from "./Helpers";
import { fetchProcessLog } from "./Log";

/*******************************************************************************
  Processes
*******************************************************************************/
export const REQUEST_PROCESS = "REQUEST_PROCESS";
export function requestProcess(name) {
  return {
    type : REQUEST_PROCESS,
    name : name
  };
}

export const RECEIVE_PROCESS = "RECEIVE_PROCESS";
export function receiveProcess(name, json, status) {
  return {
    type : RECEIVE_PROCESS,
    name : name,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export const RECEIVE_PROCESS_ERROR = "RECEIVE_PROCESS_ERROR";
export function receiveProcessError(name, error) {
  return {
    type : RECEIVE_PROCESS_ERROR,
    name : name,
    response : null,
    status : null,
    error : error,
    receivedAt : Date.now()
  };
}
export function fetchProcess(name) {
  return dispatch => {
    dispatch(requestProcess(name));
    return fetch("http://127.0.0.1:30000/api/controller/processes/" + name)
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receiveProcess(name, jsonResponse.json, jsonResponse.status));
          });
      })
      .catch(err => {
        dispatch(receiveProcessError(name, createGenericError(name, err)));
      });
  };
}

export function doFetchProcess(name) {
  return (dispatch, getState) => {
    return fetchProcess(name);
  };
}

/*******************************************************************************
  Process actions
*******************************************************************************/
export const POST_PROCESS_ACTION = "POST_PROCESS_ACTION";
export function postProcessAction(name, action) {
  return {
    type : POST_PROCESS_ACTION,
    name : name,
    action : action
  };
}

export const RECEIVE_PROCESS_ACTION_RESULT = "RECEIVE_PROCESS_ACTION_RESULT";
export function receiveProcessActionResult(name, action, json, status) {
  return {
    type : RECEIVE_PROCESS_ACTION_RESULT,
    name : name,
    action : action,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export const RECEIVE_PROCESS_ACTION_RESULT_ERROR = "RECEIVE_PROCESS_ACTION_RESULT_ERROR";
export function receiveProcessActionResultError(name, action, error) {
  return {
    type : RECEIVE_PROCESS_ACTION_RESULT_ERROR,
    name : name,
    action : action,
    response : null,
    status : null,
    error : error,
    receivedAt : Date.now()
  };
}

export function fetchPostProcessAction(name, action) {
  return dispatch => {
    dispatch(postProcessAction(name));
    return fetch(
      "http://127.0.0.1:30000/api/controller/processes/" + name + "/action",
      {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        cache: "no-store",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action)
      }
    ).then(response => { 
      response.json().then( data => { return {json: data, status: response.status};} )
        .then(jsonResponse => {
          dispatch(receiveProcessActionResult(name, action, jsonResponse.json, jsonResponse.status));
          return true;
        })
        .then(delay(250))
        .then(() => {
          fetchProcess(name)(dispatch);
          fetchProcessLog(name)(dispatch);
        });
    })
      .catch(err => {
        dispatch(receiveProcessActionResultError(name, action, err));
      });
  };
}

export function doFetchPostProcessAction(name, action) {
  return (dispatch, getState) => {
    return fetchPostProcessAction(name, action);
  };
}
