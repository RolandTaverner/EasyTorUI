import fetch from "isomorphic-fetch";

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
