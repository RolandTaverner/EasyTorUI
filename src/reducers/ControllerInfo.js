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
          fetchError : null,
          pid : null
        }
      );
    case RECEIVE_CONTROLLERINFO:
      return Object.assign({}, state, 
        { 
          isFetching : false,
          fetchError : null,
          pid : action.response.PID
        }
      );
      default:
      return state;
  }};

export default ControllerInfo;

