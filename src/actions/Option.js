import fetch from "isomorphic-fetch";
import { createGenericError } from "./Helpers";

/*******************************************************************************
  Options
*******************************************************************************/
export const REQUEST_OPTION = "REQUEST_OPTION";
export function requestOption(processName, configName, optionName) {
  return {
    type : REQUEST_OPTION,
    processName : processName,
    configName : configName,
    optionName : optionName
  };
}

export const RECEIVE_OPTION = "RECEIVE_OPTION";
export function receiveOption(processName, configName, optionName, json, status) {
  return {
    type : RECEIVE_OPTION,
    processName : processName,
    configName : configName,
    optionName : optionName,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export const RECEIVE_OPTION_ERROR = "RECEIVE_OPTION_ERROR";
export function receiveOptionError(processName, configName, optionName, error) {
  return {
    type : RECEIVE_OPTION_ERROR,
    processName : processName,
    configName : configName,
    optionName : optionName,
    response : null,
    status : null,
    error : error,
    receivedAt : Date.now()
  };
}

export function fetchOption(processName, configName, optionName) {
  return dispatch => {
    dispatch(requestOption(processName, configName, optionName));
    return fetch("http://127.0.0.1:30000/api/controller/processes/" + processName + "/configs/" + configName + "/options/" + optionName)
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receiveOption(processName, configName, optionName, jsonResponse.json, jsonResponse.status));
          });
      })
      .catch(err => {
        dispatch(receiveOptionError(processName, configName, optionName, createGenericError(err)));
      });
  };
}

export function doFetchOption(processName, configName, optionName) {
  return (dispatch, getState) => {
    return fetchOption(processName, configName, optionName);
  };
}