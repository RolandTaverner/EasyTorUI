import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import _ from "lodash";
import "react-table/react-table.css";
import "./PresetList.css";
import { doFetchPresetList } from "../../actions/Presets";
import PresetGroup from "../preset_group/PresetGroup";
import Section from "../section/Section";


class PresetListComponent extends Component {
  render() {
    const { PresetList } = this.props;
    let data = [];
    if (PresetList !== undefined && PresetList.names !== null)
    {
      data = PresetList.names.map( presetGroupName => { return { name : presetGroupName }; } );
    }

    const columns = [
      {
        Header: "Preset Group",
        id : "name",
        accessor: d => d.name,
        width: 150,
        headerStyle: { "fontWeight": "bold"}
      },
      {
        Header: "",
        id : "actions",
        headerStyle: { "fontWeight": "bold"},
        Cell : row => (
          <div>TODO</div>
          /*<PresetActions groupName={row.original.name} />*/
        )
      }
    ];
    
    return (
      <div>
        <div className="PresetsTable">
          <ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            pageSize={data.length}
            className="-striped -highlight"
            SubComponent={
              row => {
                return (
                  <div className="PresetSectionContainer">
                    <Section headerText="PROCESSES" bgColor="#FAFAFF">
                      <PresetGroup groupName={row.original.name} />
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
    const { isFetching, names } = this.props.PresetList;
    const { dispatch } = this.props;

    if (this.props.PresetList === undefined || (names === null && !isFetching))
    {
      dispatch(this.props.doFetchPresetList());
    }
  }

  shouldComponentUpdate(nextProps) {
    const currentPresetNames = this.props.PresetList.names !== null ? this.props.PresetList.names : [];
    const nextPresetNames = nextProps.PresetList.names !== null ? nextProps.PresetList.names : [];
    return !_.isEqual(currentPresetNames.sort(), nextPresetNames.sort());
  }
  
}

PresetListComponent.propTypes = {
  dispatch : PropTypes.func.isRequired,
  doFetchPresetList : PropTypes.func.isRequired,
  PresetList : PropTypes.object
};

function mapStateToProps (state, ownProps) {
  return {
    PresetList : state.PresetList
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators( { doFetchPresetList }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresetListComponent);
