import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import _ from "lodash";
import "./PresetGroup.css";
import { doFetchPresetGroup } from "../../actions/Presets";
import Section from "../section/Section";

class ProcessPresetsComponent extends Component {
  render() {
    const { configs } = this.props;

    const columns = [
      {
        Header: "Option",
        id : "option_name",
        accessor: d => d.name,
        width: 150,
        headerStyle: { "fontWeight": "bold"}
      },
      {
        Header: "Value",
        id : "value",
        headerStyle: { "fontWeight": "bold"},
        Cell : row => {
          if (row.original.array_value !== undefined)
          {
            return row.original.array_value.map((i, index) => <p className="PresetItem" key={index}>{i}</p>);
          }
          return <p className="PresetItem">{row.original.value}</p>;
        }
      }
    ];

    return (
      <div className="PresetsConfigTabs">
        { configs !== undefined ?
          <Tabs style={{height: "100%", display : "block", overflow: "auto"}}>
            <TabList>
              { configs.map( c => ( <Tab key={"Tab" + c.config_name}><b>{c.config_name}</b> presets</Tab>)) }
            </TabList>
            <div className="PresetsConfigTabPanel">
              { configs.map( c => ( 
                <TabPanel key={"TabPanel" + c.config_name}>  
                  <ReactTable
                    data={c.options}
                    columns={columns}
                    showPagination={c.options.length > 10}
                    pageSize={Math.min(c.options.length, 10)}
                    className="-striped -highlight"
                  />

                </TabPanel>)) }
            </div>
          </Tabs> : "" }
      </div>);
  }
}

ProcessPresetsComponent.propTypes = {
  dispatch : PropTypes.func.isRequired,
  groupName : PropTypes.string.isRequired,
  processName : PropTypes.string.isRequired,
  configs : PropTypes.array
};

function mapStateToProcessPresetsProps (state, ownProps) {
  return {
    configs : _.find(_.find(state.Presets, pg => { return pg.groupName === ownProps.groupName; }).processConfigs, pc => { return pc.process_id === ownProps.processName; }).configs
  };
}

export const ProcessPresets = connect(mapStateToProcessPresetsProps)(ProcessPresetsComponent);

class PresetGroupComponent extends Component {
  render() {
    const { PresetGroup, groupName } = this.props;

    if (PresetGroup === undefined)
    {
      return <div>Loading...</div>;
    }
    
    let data = [];
    if (PresetGroup.processConfigs !== null)
    {
      data = PresetGroup.processConfigs.map( pc => { return { name : pc.process_id }; } );
    }

    const columns = [
      {
        Header: "Process",
        id : "name",
        accessor: d => d.name,
        width: 150,
        headerStyle: { "fontWeight": "bold"}
      }
    ];
    
    return (
      <div>
        <div className="PresetsTable">
          <ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            pageSize={ data.length  }
            className="-striped -highlight"
            SubComponent={
              row => {
                return (
                  <div className="PresetSectionContainer">
                    <Section headerText="OPTIONS" bgColor="#FAFAFF">
                      <ProcessPresets groupName={groupName} processName={row.original.name} />
                    </Section>
                  </div>
                );
              }
            }
          />
        </div>
      </div>
    );
  }

  componentWillMount() {
    const { dispatch, groupName, PresetGroup } = this.props;
    const { isFetching, processConfigs } = (PresetGroup !== undefined ? PresetGroup : { isFetching : false, processConfigs : null });

    if (PresetGroup === undefined || (processConfigs === null && !isFetching))
    {
      dispatch(this.props.doFetchPresetGroup(groupName));
    }
  }

  shouldComponentUpdate(nextProps) {
    
    const currentProcessConfigs = this.props.PresetGroup !== undefined ? 
      (this.props.PresetGroup.processConfigs !== null ? this.props.PresetGroup.processConfigs.map(pc => pc.process_id) : []) : [];
    const nextProcessConfigs = nextProps.PresetGroup !== undefined ?
      (nextProps.PresetGroup.processConfigs !== null ? nextProps.PresetGroup.processConfigs.map(pc => pc.process_id) : []) : [];
    return !_.isEqual(currentProcessConfigs.sort(), nextProcessConfigs.sort());
  }
  
}

PresetGroupComponent.propTypes = {
  dispatch : PropTypes.func.isRequired,
  doFetchPresetGroup : PropTypes.func.isRequired,
  groupName : PropTypes.string.isRequired,
  PresetGroup : PropTypes.object
};

function mapStateToProps (state, ownProps) {
  return {
    PresetGroup : _.find(state.Presets, pg => { return pg.groupName === ownProps.groupName; })
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators( { doFetchPresetGroup }, dispatch);
  return { ...actions, dispatch };
}

export const PresetGroup = connect(mapStateToProps, mapDispatchToProps)(PresetGroupComponent);
