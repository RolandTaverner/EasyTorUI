import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import _ from "lodash";
import "react-table/react-table.css";
import "react-tabs/style/react-tabs.css";
import "./Process.css";
import { doFetchProcess, doFetchPostProcessAction } from "../../actions";

import Config from "../config/Config";

class ProcessComponentBase extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.Process === undefined)
    {
      //nextProps.dispatch(nextProps.doFetchProcess(nextProps.processName));
    }
  }

  componentWillMount() {
    const { dispatch, processName, Process } = this.props;

    if (Process === undefined)
    {
      dispatch(this.props.doFetchProcess(processName));
    }
  }

  shouldComponentUpdate(nextProps) {
    const { Process } = this.props;
  
    return !_.isEqual(Process, nextProps.Process);
  }  
}

ProcessComponentBase.propTypes = {
  dispatch : PropTypes.func.isRequired,
  doFetchProcess : PropTypes.func.isRequired,
  Process : PropTypes.object,
  processName : PropTypes.string.isRequired
};

class ProcessViewComponent extends ProcessComponentBase {

  render() {
    const { Process, processName } = this.props;

    return (
      <div className="ConfigTabs">
        { Process.configs !== null ?
          <Tabs>
            <TabList>
              { Process.configs.map( confName =>  ( <Tab key={"Tab" + confName}>{confName}</Tab>)) }
            </TabList>
            <div className="ConfigTabPanel">
              { Process.configs.map( confName => ( <TabPanel key={"TabPanel" + confName}> <Config processName={processName} configName={confName}/> </TabPanel> )) }
            </div>
          </Tabs> : "" }
      </div>
    );
  }
}

class ProcessStateComponent extends ProcessComponentBase {

  render() {
    const { Process } = this.props;

    const basicStyle = {
      textAlign : "center",
      display : "inline-block",
      padding : "3px 4px",
      fontSize : "14px",
      fontWeight : "600",
      lineHeight : "1.2",
      borderRadius : "2px",
      verticalAlign : "middle",
      boxShadow : "inset 0 -1px 0 rgba(27,31,35,0.12)",
      width : "100%"
    };

    const startingStyle = Object.assign({}, basicStyle,
      {
        color: "#1c2733",
        backgroundColor: "#84b6eb",
      });

    const runningStyle = Object.assign({}, basicStyle,
      {
        color: "#fff",
        backgroundColor: "#128A0C"
      });

    const stoppingStyle = Object.assign({}, basicStyle,
      {
        color: "#fff",
        backgroundColor: "#cc317c"
      });

    const stoppedStyle = Object.assign({}, basicStyle,
      {
        color: "#333333",
        backgroundColor: "#cccccc"
      });

    let styles = {};
    styles["starting"] = startingStyle;
    styles["running"] = runningStyle;
    styles["stopping"] = stoppingStyle;
    styles["stopped"] = stoppedStyle;

    if (Process === undefined || Process.isFetching === true)
    {
      return (<div style={stoppedStyle}>Loading...</div>);
    }
    return (<div style={styles[Process.processState]}>{Process.processState.toUpperCase()}</div>);
  }
}

class ProcessActionsComponent extends ProcessComponentBase {

  render() {
    const { dispatch, Process, processName } = this.props;
    let buttons = [];
    buttons.push(<button className="ProcessButton RefreshProcessButton" key={processName + "Refresh"} onClick={() => { dispatch(this.props.doFetchProcess(processName)); } }>Refresh</button>);

    if (Process !== undefined && Process.processState !== null)
    {
      if (Process.processState === "starting" || Process.processState === "running")
      {
        buttons.push(<button className="ProcessButton StopProcessButton" key={processName + "Stop"} onClick={() => { dispatch(this.props.doFetchPostProcessAction(processName, {action : "stop"})); } }>Stop</button>);
      }
      else if (Process.processState === "stopped")
      {
        buttons.push(<button className="ProcessButton StartProcessButton" key={processName + "Start"} onClick={() => { dispatch(this.props.doFetchPostProcessAction(processName, {action : "start"})); } }>Start</button>);
      }
    }
    return ( <div className="ProcessButtons"> {buttons} </div> );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    Process : _.find(state.Processes, p => { return p.name === ownProps.processName; } )
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchProcess, doFetchPostProcessAction }, dispatch);
  return { ...actions, dispatch };
}

export const ProcessView = connect(mapStateToProps, mapDispatchToProps)(ProcessViewComponent);
export const ProcessState = connect(mapStateToProps, mapDispatchToProps)(ProcessStateComponent);
export const ProcessActions = connect(mapStateToProps, mapDispatchToProps)(ProcessActionsComponent);
