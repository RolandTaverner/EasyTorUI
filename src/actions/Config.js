import fetch from "isomorphic-fetch";

/*******************************************************************************
  Configs
*******************************************************************************/
export const REQUEST_CONFIG = "REQUEST_CONFIG";
export function requestConfig(processName, configName) {
  return {
    type : REQUEST_CONFIG,
    processName : processName,
    configName : configName
  };
}

export const RECEIVE_CONFIG = "RECEIVE_CONFIG";
export function receiveConfig(processName, configName, json, status) {
  return {
    type : RECEIVE_CONFIG,
    processName : processName,
    configName : configName,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export function fetchConfig(processName, configName) {
  return dispatch => {
    dispatch(requestConfig(processName, configName));
    return fetch("http://127.0.0.1:30000/api/controller/processes/" + processName + "/configs/" + configName)
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receiveConfig(processName, configName, jsonResponse.json, jsonResponse.status));
          });
      })
      .catch(err => {
        
      });
  };
}

export function doFetchConfig(processName, configName) {
  return (dispatch, getState) => {
    return fetchConfig(processName, configName);
  };
}
