import fetch from "isomorphic-fetch";
import { createGenericError } from "./Helpers";
import store from "../Store";

import { fetchOption } from "./Option";

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

export const RECEIVE_PRESETLIST_ERROR = "RECEIVE_PRESETLIST_ERROR";
export function receivePresetListError(error) {
  return {
    type : RECEIVE_PRESETLIST_ERROR,
    response : null,
    status : null,
    error : error,
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
        dispatch(receivePresetListError(createGenericError(err)));
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

/*******************************************************************************
  Apply PresetGroup
*******************************************************************************/
export const APPLY_PRESETGROUP = "APPLY_PRESETGROUP";
export function applyPresetGroup(groupName) {
  return {
    type : APPLY_PRESETGROUP,
    name : groupName
  };
}

export const RECEIVE_APPLY_PRESETGROUP_RESULT = "RECEIVE_APPLY_PRESETGROUP_RESULT";
export function receiveApplyPresetGroupResult(groupName, json, status) {
  return {
    type : RECEIVE_APPLY_PRESETGROUP_RESULT,
    groupName : groupName,
    response : json,
    status : status,
    receivedAt : Date.now()
  };
}

export const RECEIVE_APPLY_PRESETGROUP_RESULT_ERROR = "RECEIVE_APPLY_PRESETGROUP_RESULT_ERROR";
export function receiveApplyPresetGroupResultError(groupName, error) {
  return {
    type : RECEIVE_APPLY_PRESETGROUP_RESULT_ERROR,
    groupName : groupName,
    response : null,
    status : null,
    error : error,
    receivedAt : Date.now()
  };
}

export function fetchApplyPresetGroup(groupName) {
  return dispatch => {
    return fetch(
      "http://127.0.0.1:30000/api/controller/presets",
      {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        cache: "no-store",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name : groupName})
      }
    ).then(response => { 
      response.json().then( data => { return {json: data, status: response.status};} )
        .then(jsonResponse => {
          dispatch(receiveApplyPresetGroupResult(groupName, jsonResponse.json, jsonResponse.status));
          return true;
        })
        .then(() => {
          const { Options } = store.getState();
          Options.forEach( (option) => {
            fetchOption(option.processName, option.configName, option.optionName)(dispatch);
          });
        });
    })
      .catch(err => {
        dispatch(receiveApplyPresetGroupResultError(groupName, err));
      });
  };
}

export function doFetchApplyPresetGroup(groupName) {
  return (dispatch, getState) => {
    return fetchApplyPresetGroup(groupName);
  };
}
