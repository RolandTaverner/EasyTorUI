import fetch from 'isomorphic-fetch';

/*******************************************************************************
  Controller info
*******************************************************************************/
export const REQUEST_CONTROLLERINFO = 'REQUEST_CONTROLLERINFO'
export function requestControllerInfo() {
  return {
    type : REQUEST_CONTROLLERINFO
  }
}

export const RECEIVE_CONTROLLERINFO = 'RECEIVE_CONTROLLERINFO'
export function receiveControllerInfo(json, status) {
  return {
    type : RECEIVE_CONTROLLERINFO,
    response : json,
    status : status,
    receivedAt : Date.now()
  }
}

export function fetchControllerInfo() {
  return dispatch => {
    dispatch(requestControllerInfo());
    return fetch(`http://127.0.0.1:30000/api/controller`)
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
        .then(jsonResponse => {
          dispatch(receiveControllerInfo(jsonResponse.json, jsonResponse.status));
        });
      })
      .catch(err => {
        
      });
  }
}

export function doFetchControllerInfo() {
  return (dispatch, getState) => {
    return fetchControllerInfo();
  }
}

/*******************************************************************************
  ProcessList
*******************************************************************************/
export const REQUEST_PROCESSLIST = 'REQUEST_PROCESSLIST'
export function requestProcessList() {
  return {
    type : REQUEST_PROCESSLIST
  }
}

export const RECEIVE_PROCESSLIST = 'RECEIVE_PROCESSLIST'
export function receiveProcessList(json, status) {
  return {
    type : RECEIVE_PROCESSLIST,
    response : json,
    status : status,
    receivedAt : Date.now()
  }
}

export function fetchProcessList() {
  return dispatch => {
    dispatch(requestProcessList());
    return fetch(`http://127.0.0.1:30000/api/controller/processes`)
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
        .then(jsonResponse => {
          dispatch(receiveProcessList(jsonResponse.json, jsonResponse.status));
        });
      })
      .catch(err => {
        
      });
  }
}

export function doFetchProcessList() {
  return (dispatch, getState) => {
    return fetchProcessList();
  }
}

/*******************************************************************************
  Processes
*******************************************************************************/
export const REQUEST_PROCESS = 'REQUEST_PROCESS'
export function requestProcess(name) {
  return {
    type : REQUEST_PROCESS,
    name : name
  }
}

export const RECEIVE_PROCESS = 'RECEIVE_PROCESS'
export function receiveProcess(name, json, status) {
  return {
    type : RECEIVE_PROCESS,
    name : name,
    response : json,
    status : status,
    receivedAt : Date.now()
  }
}

export function fetchProcess(name) {
  return dispatch => {
    dispatch(requestProcess(name));
    return fetch(`http://127.0.0.1:30000/api/controller/processes`)
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
        .then(jsonResponse => {
          dispatch(receiveProcess(name, jsonResponse.json, jsonResponse.status));
        });
      })
      .catch(err => {
        
      });
  }
}

export function doFetchProcess(name) {
  return (dispatch, getState) => {
    return fetchProcess(name);
  }
}
