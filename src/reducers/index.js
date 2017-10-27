import { combineReducers } from "redux";
import ControllerInfo from "./ControllerInfo.js";
import ProcessList from "./ProcessList.js";
import Processes from "./Processes.js";
import Configs from "./Configs.js";
import Options from "./Options.js";
import PresetList from "./PresetList.js";
import Presets from "./Presets.js";

const TorControllerReducers = combineReducers({
  ControllerInfo : ControllerInfo,
  ProcessList : ProcessList,
  Processes : Processes,
  Configs : Configs,
  Options : Options,
  PresetList : PresetList,
  Presets : Presets
});

const initialState = {
  ControllerInfo : {
    isFetching : false,
    error : null,
    pid : null
  },
  ProcessList : {
    isFetching : false,
    error : null,
    names : null
  },
  Processes: [],
  Configs : [],
  Options : [],

  PresetList : {
    isFetching : false,
    error : null,
    names : null 
  },
  Presets : [],
};

export { TorControllerReducers, initialState };
