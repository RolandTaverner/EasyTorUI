import { combineReducers } from 'redux'
import ControllerInfo from './ControllerInfo.js'
import ProcessList from './ProcessList.js'
import Processes from './Processes.js'
import Presets from './Presets.js'

const TorControllerReducers = combineReducers({
  ControllerInfo : ControllerInfo,
  ProcessList : ProcessList,
  Processes : Processes,
  Presets : Presets
});

const initialState = {
  ControllerInfo : { 
    isFetching : false,
    fetchError : null,
    pid : null
  },
  ProcessList : {
    isFetching : false,
    fetchError : null,
    names : null //["tor", "privoxy"]
  },
  
  Processes: [
  /*{
    name : "",
    status  : "",
    configs: [],
    exitCode = 0,
    unexpectedExit = false
  }*/],

  Presets : [],
};

/*
{
  ControllerInfo : { pid : 0 },
  Processes : [ "tor", "privoxy" ],
  ProcessesByName: [
    {
      name : "tor",
      status: "running"
    }
  ],

  Presets : [],
};
*/

export { TorControllerReducers, initialState };