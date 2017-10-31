import _ from "lodash";

import {
  REQUEST_PROCESS_LOG,
  RECEIVE_PROCESS_LOG,
  RECEIVE_PROCESS_LOG_ERROR
} from "../actions/Log";

const Logs = (state = [], action) => {

  const thisProcessLog =  p => (p.processName === action.name);
  const notThisProcessLog = p => (!thisProcessLog(p));

  const foundItem = _.find(state, thisProcessLog);
  const existingItem = foundItem !== undefined ? foundItem : {};
  let newItem = {};

  switch (action.type) {
  case REQUEST_PROCESS_LOG:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : true,
        error : null,
        processName : action.name,
        log : null
      });
    return [ ...state.filter(notThisProcessLog), newItem ];
  case RECEIVE_PROCESS_LOG:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
        processName : action.name,
        log : action.response
      });
    return [ ...state.filter(notThisProcessLog), newItem ];
  case RECEIVE_PROCESS_LOG_ERROR:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : action.error,
        processName : action.name,
        log : null
      });
    return [ ...state.filter(notThisProcessLog), newItem ];
  default:
    return state;
  }};

export default Logs;
