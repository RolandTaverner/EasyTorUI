import fetch from "isomorphic-fetch";

/*******************************************************************************
  PresetList
*******************************************************************************/
export const REQUEST_PRESETLIST = "REQUEST_PRESETLIST";
export function requestPresetList() {
  return {
    type : REQUEST_PRESETLIST
  };
}

export const RECEIVE_PRESETLIST = "RECEIVE_PRESETLIST";
export function receivePresetList(json, status) {
  return {
    type : RECEIVE_PRESETLIST,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export function fetchPresetList() {
  return dispatch => {
    dispatch(requestPresetList());
    return fetch("http://127.0.0.1:30000/api/controller/presets")
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receivePresetList(jsonResponse.json, jsonResponse.status));
          });
      })
      .catch(err => {
        
      });
  };
}

export function doFetchPresetList() {
  return (dispatch, getState) => {
    return fetchPresetList();
  };
}

/*******************************************************************************
  PresetGroup
*******************************************************************************/
export const REQUEST_PRESETGROUP = "REQUEST_PRESETGROUP";
export function requestPresetGroup(groupName) {
  return {
    type : REQUEST_PRESETGROUP,
    groupName : groupName
  };
}

export const RECEIVE_PRESETGROUP = "RECEIVE_PRESETGROUP";
export function receivePresetGroup(groupName, json, status) {
  return {
    type : RECEIVE_PRESETGROUP,
    groupName : groupName,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export function fetchPresetGroup(groupName) {
  return dispatch => {
    dispatch(requestPresetGroup(groupName));
    return fetch("http://127.0.0.1:30000/api/controller/presets/" + groupName)
      .then(response => { 
        response.json().then( data => { return {json: data, status: response.status};} )
          .then(jsonResponse => {
            dispatch(receivePresetGroup(groupName, jsonResponse.json, jsonResponse.status));
          });
      })
      .catch(err => {
        
      });
  };
}

export function doFetchPresetGroup(groupName) {
  return (dispatch, getState) => {
    return fetchPresetGroup(groupName);
  };
}