import _ from 'lodash';

import {
  REQUEST_OPTION,
  RECEIVE_OPTION
} from '../actions'


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
    default:
      return state;
  }};

export default Options;
