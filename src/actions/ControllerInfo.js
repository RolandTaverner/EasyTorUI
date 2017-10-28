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
        console.log("Fetch failed: ", err.toString());
      });
  };
}

export function doFetchControllerInfo() {
  return (dispatch, getState) => {
    return fetchControllerInfo();
  };
}
