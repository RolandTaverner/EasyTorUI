import {
  REQUEST_CONFIG,
  RECEIVE_CONFIG
} from '../actions'

const Configs = (state = [], action) => {
  switch (action.type) {
    case REQUEST_CONFIG:
      return [
        ...state.filter(c => (!(c.configName.localeCompare(action.configName) === 0 && c.processName.localeCompare(action.processName) === 0))),
        {
          isFetching : true,
          fetchError : null,
          processName : action.processName,
          configName : action.configName,
          options : null
        }
      ];
    case RECEIVE_CONFIG:
      return [
        ...state.filter(c => (!(c.configName.localeCompare(action.configName) === 0 && c.processName.localeCompare(action.processName) === 0))),
        {
          isFetching : false,
          error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
          processName : action.processName,
          configName : action.configName,
          options : action.response.options
        }
      ];
    default:
      return state;
  }};

export default Configs;