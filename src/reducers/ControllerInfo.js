import {
  REQUEST_CONTROLLERINFO,
  RECEIVE_CONTROLLERINFO
} from '../actions'

const ControllerInfo = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CONTROLLERINFO:
      return Object.assign({}, state, 
        { 
          isFetching : true,
          error : null,
          pid : null
        }
      );
    case RECEIVE_CONTROLLERINFO:
      return Object.assign({}, state, 
        { 
          isFetching : false,
          error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
          pid : action.response.PID
        }
      );
      default:
      return state;
  }};

export default ControllerInfo;

