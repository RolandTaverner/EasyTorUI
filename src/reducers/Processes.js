import _ from "lodash";

import {
  REQUEST_PROCESS,
  RECEIVE_PROCESS,
  POST_PROCESS_ACTION,
  RECEIVE_PROCESS_ACTION_RESULT
} from "../actions";

const Processes = (state = [], action) => {

  const thisProcess =  p => (p.name === action.name);
  const notThisProcess = p => (!thisProcess(p));

  const foundItem = _.find(state, thisProcess);
  const existingItem = foundItem !== undefined ? foundItem : {};
  let newItem = {};

  switch (action.type) {
  case REQUEST_PROCESS:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : true,
        error : null,
        name : action.name,
        processState : null,
        configs : null
      });
    return [ ...state.filter(notThisProcess), newItem ];
  case RECEIVE_PROCESS:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
        name : action.name,
        processState : action.response.status,
        configs : action.response.configs
        /*exitCode : action.response.exit_code,
        unexpectedExit = action.response.unexpected_exit*/
      });
    return [ ...state.filter(notThisProcess), newItem ];
  case POST_PROCESS_ACTION:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : true,
        error : null,
        name : action.name,
        actionResult : null
      });
    return [ ...state.filter(notThisProcess), newItem ];
  case RECEIVE_PROCESS_ACTION_RESULT:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
        name : action.name,
        actionResult : action.response.status
      });
    return [ ...state.filter(notThisProcess), newItem ];
  default:
    return state;
  }};

export default Processes;
