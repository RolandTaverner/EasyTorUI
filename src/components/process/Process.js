import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import _ from 'lodash';
import 'react-table/react-table.css';
import 'react-tabs/style/react-tabs.css';
import './Process.css';
import { doFetchProcess } from '../../actions';
import Config from '../config/Config';


class ProcessComponent extends Component {
  render() {
    const { Process, processName } = this.props;

    return (
      <div className="Process">
        <div>
        process {processName}
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

  componentDidMount() {
    const { isFetching, configs } = this.props.Process;
    const { dispatch, processName } = this.props;

    if (configs === null && !isFetching)
    {
      dispatch(this.props.doFetchProcessList(processName));
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    //const { dispatch } = this.props;
/*
    const currentProcessNames = this.props.ProcessList.names !== null ? this.props.ProcessList.names : [];
    
    if (nextProps.ProcessList.names !== null && !_.isEqual(currentProcessNames.sort(), nextProps.ProcessList.names.sort())) 
    {
      nextProps.ProcessList.names.forEach((currentValue, index, array) => { dispatch(this.props.doFetchProcess(currentValue)); });
    }
  */
  }

  shouldComponentUpdate(nextProps) {
    const currentConfigNames = this.props.Process.configs !== null ? this.props.Process.configs : [];
    const nextConfigNames = nextProps.Process.configs !== null ? nextProps.Process.configs : [];
    return !_.isEqual(currentConfigNames.sort(), nextConfigNames.sort());
  }  
}

function mapStateToProps (state, ownProps) {
  return {
    Process : _.find(state.Processes, p => { return p.name == ownProps.processName; } )
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchProcess }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessComponent);
