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
          error : null,
          names : null
        }
      );
    case RECEIVE_PROCESSLIST:
      return Object.assign({}, state,
        {
          isFetching : false,
          error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
          names : action.response
        }
      );
    default:
      return state;
  }};

export default ProcessList;
