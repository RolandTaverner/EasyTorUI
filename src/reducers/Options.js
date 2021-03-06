import _ from "lodash";

import {
  REQUEST_OPTION,
  RECEIVE_OPTION,
  RECEIVE_OPTION_ERROR,
  SET_OPTION_VALUE,
  DELETE_OPTION_VALUE,
  MODIFY_OPTION_ERROR
} from "../actions/Option";


const Options = (state = [], action) => {

  const thisOption = opt => (opt.configName.localeCompare(action.configName) === 0
                                && opt.processName.localeCompare(action.processName) === 0
                                && opt.optionName.localeCompare(action.optionName) === 0);
  const notThisOption = opt => (!thisOption(opt));

  const foundItem = _.find(state, thisOption);
  const existingItem = foundItem !== undefined ? foundItem : {};
  let newItem = {};

  switch (action.type) {
  case REQUEST_OPTION:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : true,
        error : null,
        modifyError : null,
        processName : action.processName,
        configName : action.configName,
        optionName : action.optionName,
        presentation : null,
        value : null
      });
    return [ ...state.filter(notThisOption), newItem ];
  case RECEIVE_OPTION:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null },
        modifyError : null,
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
      });
    return [ ...state.filter(notThisOption), newItem ];
  case RECEIVE_OPTION_ERROR:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : action.error,
        modifyError : null,
        processName : action.processName,
        configName : action.configName,
        optionName : action.optionName,
        presentation : null,
        isSystem : null,
        isRequired : null,
        valueType : null,
        isList : null,
        domain : null,
        value : null,
        defaultValue : null
      });
    return [ ...state.filter(notThisOption), newItem ];
  case SET_OPTION_VALUE:
  case DELETE_OPTION_VALUE:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : true,
        error : null,
        modifyError : null
      });
    return [ ...state.filter(notThisOption), newItem ];
  case MODIFY_OPTION_ERROR:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : null,
        modifyError : action.modifyError
      });
    return [ ...state.filter(notThisOption), newItem ];
  default:
    return state;
  }};

export default Options;
