import {
  REQUEST_PROCESS,
  RECEIVE_PROCESS
} from '../actions'

const Processes = (state = [], action) => {
  switch (action.type) {
    case REQUEST_PROCESS:
      return Object.assign({}, state, 
        { 
          isFetching : true,
          fetchError : null,
          names : null
        }
      );
    case RECEIVE_PROCESS:
      return Object.assign({}, state, 
        { 
          isFetching : false,
          fetchError : null,
          names : action.response
        }
      );
    default:
      return state;
  }};

export default Processes;