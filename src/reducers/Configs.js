import _ from 'lodash';

import {
  REQUEST_CONFIG,
  RECEIVE_CONFIG
} from '../actions'

const Configs = (state = [], action) => {

  const thisConfig =  c => (c.configName.localeCompare(action.configName) === 0 && c.processName.localeCompare(action.processName));
  const notThisConfig = c => (!thisConfig(c));

  const foundItem = _.find(state, thisConfig);
  const existingItem = foundItem !== undefined ? foundItem : {};
  let newItem = {};

  switch (action.type) {
    case REQUEST_CONFIG:
      newItem = Object.assign({}, existingItem,
        {
          isFetching : true,
          error : null,
          processName : action.processName,
          configName : action.configName,
          options : null
        });
      return [ ...state.filter(thisConfig), newItem ];
    case RECEIVE_CONFIG:
      newItem = Object.assign({}, existingItem,
        {
          isFetching : false,
          error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
          processName : action.processName,
          configName : action.configName,
          options : action.response.options
        });
      return [ ...state.filter(thisConfig), newItem ];
    default:
      return state;
  }};

export default Configs;
