import {
  REQUEST_PRESETLIST,
  RECEIVE_PRESETLIST
} from "../actions";

const PresetList = (state = [], action) => {
  switch (action.type) {
  case REQUEST_PRESETLIST:
    return Object.assign({}, state,
      {
        isFetching : true,
        error : null,
        names : null
      }
    );
  case RECEIVE_PRESETLIST:
    return Object.assign({}, state,
      {
        isFetching : false,
        error : action.status === 200 ? null : { apiError : action.response, httpStatus : action.status, generic : null},
        names : action.response
      }
    );
  default:
    return state;
  }
};

export default PresetList;
