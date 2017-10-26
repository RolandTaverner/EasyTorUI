import fetch from "isomorphic-fetch";

/*******************************************************************************
  Controller info
*******************************************************************************/
export const REQUEST_CONTROLLERINFO = "REQUEST_CONTROLLERINFO";
export function requestControllerInfo() {
  return {
    type : REQUEST_CONTROLLERINFO
  };
}

export const RECEIVE_CONTROLLERINFO = "RECEIVE_CONTROLLERINFO";
export function receiveControllerInfo(json, status) {
  return {
    type : RECEIVE_CONTROLLERINFO,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export function fetchControllerInfo() {
  return dispatch => {
    dispatch(requestControllerInfo());
    return fetch("http://127.0.0.1:30000/api/controller")
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receiveControllerInfo(jsonResponse.json, jsonResponse.status));
          });
      }).catch(err => {
        
      });
  };
}

export function doFetchControllerInfo() {
  return (dispatch, getState) => {
    return fetchControllerInfo();
  };
}

/*******************************************************************************
  ProcessList
*******************************************************************************/
export const REQUEST_PROCESSLIST = "REQUEST_PROCESSLIST";
export function requestProcessList() {
  return {
    type : REQUEST_PROCESSLIST
  };
}

export const RECEIVE_PROCESSLIST = "RECEIVE_PROCESSLIST";
export function receiveProcessList(json, status) {
  return {
    type : RECEIVE_PROCESSLIST,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export function fetchProcessList() {
  return dispatch => {
    dispatch(requestProcessList());
    return fetch("http://127.0.0.1:30000/api/controller/processes")
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receiveProcessList(jsonResponse.json, jsonResponse.status));
          });
      })
      .catch(err => {
        
      });
  };
}

export function doFetchProcessList() {
  return (dispatch, getState) => {
    return fetchProcessList();
  };
}

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
    response : json,
    status : status,
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
        });
    })
      .catch(err => {
        
      });
  };
}

export function doFetchPostProcessAction(name, action) {
  return (dispatch, getState) => {
    return fetchPostProcessAction(name, action);
  };
}
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
        
      });
  };
}

export function doFetchOption(processName, configName, optionName) {
  return (dispatch, getState) => {
    return fetchOption(processName, configName, optionName);
  };
}
