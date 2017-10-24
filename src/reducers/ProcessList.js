import {
  REQUEST_PROCESSLIST,
  RECEIVE_PROCESSLIST
} from '../actions'

const ProcessList = (state = [], action) => {
  switch (action.type) {
    case REQUEST_PROCESSLIST:
      return Object.assign({}, state, 
        { 
          isFetching : true,
          fetchError : null,
          names : null
        }
      );
    case RECEIVE_PROCESSLIST:
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

export default ProcessList;