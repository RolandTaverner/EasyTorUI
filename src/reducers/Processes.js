import {
  REQUEST_PROCESS,
  RECEIVE_PROCESS
} from '../actions'

const Processes = (state = [], action) => {
  switch (action.type) {
    case REQUEST_PROCESS:
      return [
        ...state.filter(p => (p.name.localeCompare(action.name) !== 0)),
        {
          isFetching : true,
          fetchError : null,
          name : action.name,
          status : null,
          configs : null
        }
      ];
    case RECEIVE_PROCESS:
      return [
        ...state.filter(p => (p.name.localeCompare(action.name) !== 0)),
        {
          isFetching : false,
          fetchError : null,
          name : action.name,
          status : action.response.status,
          configs : action.response.configs
          /*exitCode : action.response.exit_code,
          unexpectedExit = action.response.unexpected_exit*/
        }
      ];
    default:
      return state;
  }};

export default Processes;