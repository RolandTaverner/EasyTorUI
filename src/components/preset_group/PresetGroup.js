import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import _ from "lodash";
import "react-table/react-table.css";
import "./PresetGroup.css";
import { doFetchPresetGroup } from "../../actions/Presets";
import Section from "../section/Section";


class PresetGroupComponent extends Component {
  render() {
    const { PresetGroup } = this.props;

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
                    <Section headerText="PRESET OPTIONS" bgColor="#FAFAFF">
                      
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

export default connect(mapStateToProps, mapDispatchToProps)(PresetGroupComponent);
