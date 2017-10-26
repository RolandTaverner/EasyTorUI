import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import _ from 'lodash';
import 'react-table/react-table.css';
import 'react-tabs/style/react-tabs.css';
import './Process.css';
import { doFetchProcess, doFetchPostProcessAction } from '../../actions';
import Config from '../config/Config';

class ProcessComponentBase extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.Process === undefined)
    {
      nextProps.dispatch(nextProps.doFetchProcess(nextProps.processName));
    }
  }

  componentDidMount() {
    const { dispatch, processName, Process } = this.props;

    if (Process === undefined || (Process.configs === null && !Process.isFetching))
    {
      dispatch(this.props.doFetchProcess(processName));
    }
  }

  shouldComponentUpdate(nextProps) {
    const { Process } = this.props;
  
    return !_.isEqual(Process, nextProps.Process);
  }  

}

class ProcessViewComponent extends ProcessComponentBase {

  render() {
    const { Process, processName } = this.props;

    return (
      <div className="Process">
        <div className="ProcessHeaders">
          CONFIGURATIONS
        </div>
        <div className="ConfigTabs">
        { Process.configs !== null ?
          <Tabs>
            <TabList>
              {Process.configs.map( (confName, index) =>  { return <Tab key={"Tab" + confName}>{confName}</Tab>;})}
            </TabList>
            <div className="ConfigTabPanel">
              {Process.configs.map((confName, index) => { return <TabPanel key={"TabPanel" + confName}> <Config processName={processName} configName={confName}/> </TabPanel>;})}
            </div>
          </Tabs> : "" }
          </div>
      </div>
    );
  }
}

class ProcessStateComponent extends ProcessComponentBase {

  render() {
    const { Process } = this.props;

    if (Process === undefined || Process.isFetching === true)
    {
      return (<div>Loading...</div>);
    }
    return (<div>{Process.processState}</div>);
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
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchProcess, doFetchPostProcessAction }, dispatch);
  return { ...actions, dispatch };
}

export const ProcessView = connect(mapStateToProps, mapDispatchToProps)(ProcessViewComponent);
export const ProcessState = connect(mapStateToProps, mapDispatchToProps)(ProcessStateComponent);
export const ProcessActions = connect(mapStateToProps, mapDispatchToProps)(ProcessActionsComponent);
