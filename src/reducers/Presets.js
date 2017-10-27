import _ from "lodash";

import {
  REQUEST_PRESETGROUP,
  RECEIVE_PRESETGROUP
} from "../actions";

const Presets = (state = [], action) => {

  const thisGroup =  c => (c.groupName.localeCompare(action.groupName) === 0);
  const notThisGroup = c => (!thisGroup(c));

  const foundItem = _.find(state, thisGroup);
  const existingItem = foundItem !== undefined ? foundItem : {};
  let newItem = {};

  switch (action.type) {
  case REQUEST_PRESETGROUP:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : true,
        error : null,
        groupName : action.groupName,
        processConfigs : null
      });
    return [ ...state.filter(notThisGroup), newItem ];
  case RECEIVE_PRESETGROUP:
    newItem = Object.assign({}, existingItem,
      {
        isFetching : false,
        error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
        groupName : action.groupName,
        processConfigs : action.response
      });
    return [ ...state.filter(notThisGroup), newItem ];
  default:
    return state;
  }};

export default Presets;
