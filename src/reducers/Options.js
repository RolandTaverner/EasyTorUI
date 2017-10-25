import {
  REQUEST_OPTION,
  RECEIVE_OPTION
} from '../actions'

const Options = (state = [], action) => {
  switch (action.type) {
    case REQUEST_OPTION:
      return [
        ...state.filter(opt => (!(opt.configName.localeCompare(action.configName) === 0
                                && opt.processName.localeCompare(action.processName) === 0
                                && opt.optionName.localeCompare(action.optionName) === 0))),
        {
          isFetching : true,
          fetchError : null,
          processName : action.processName,
          configName : action.configName,
          optionName : action.optionName,
          presentation : null
        }
      ];
    case RECEIVE_OPTION:
      return [
        ...state.filter(opt => (!(opt.configName.localeCompare(action.configName) === 0
                                && opt.processName.localeCompare(action.processName) === 0
                                && opt.optionName.localeCompare(action.optionName) === 0))),
        {
          isFetching : false,
          fetchError : null,
          status : action.status,
          processName : action.processName,
          configName : action.configName,
          optionName : action.optionName,
          presentation : action.response.presentation,
          isSystem : action.response.system,
          isRequired : action.response.required,
          valueType : action.response.type,
          isList : action.response.list,
          domain : action.response.domain,
          value : action.response.value,
          defaultValue : action.response.default_value
        }
      ];
    default:
      return state;
  }};

export default Options;