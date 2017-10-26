import _ from 'lodash';

import {
  REQUEST_PROCESS,
  RECEIVE_PROCESS,
  POST_PROCESS_ACTION,
  RECEIVE_PROCESS_ACTION_RESULT
} from '../actions'

const Processes = (state = [], action) => {
  const existingItem = _.find(state, p => { return p.name === action.name; } ) !== undefined ? _.find(state, p => { return p.name === action.name; } ) : {};
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
      return [ ...state.filter(p => (p.name.localeCompare(action.name) !== 0)), newItem ];
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
      return [ ...state.filter(p => (p.name.localeCompare(action.name) !== 0)), newItem ];
    case POST_PROCESS_ACTION:
      newItem = Object.assign({}, existingItem,
        {
          isFetching : true,
          error : null,
          name : action.name,
          actionResult : null
        });
      return [ ...state.filter(p => (p.name.localeCompare(action.name) !== 0)), newItem ];
    case RECEIVE_PROCESS_ACTION_RESULT:
      newItem = Object.assign({}, existingItem,
        {
          isFetching : false,
          error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
          name : action.name,
          actionResult : action.response.status
        });
      return [ ...state.filter(p => (p.name.localeCompare(action.name) !== 0)), newItem ];
    default:
      return state;
  }};

export default Processes;