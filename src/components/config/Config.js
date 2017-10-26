import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTable from "react-table";
import _ from "lodash";
import "react-table/react-table.css";
import "./Config.css";
import { doFetchConfig } from "../../actions";
import { OptionPresentation, OptionView } from "../option/Option";

class ConfigComponent extends Component {
  render() {
    const { processName, configName, Config } = this.props;
    let data = [];

    if (Config !== undefined)
    {
      if (Config.options !== null)
      {
        data = Config.options.map( optName => { return { name : optName};});
      }
    }
    const columns = [
      {
        Header: "Name",
        id : "name",
        accessor: d => d.name,
        width: 200
      },
      {
        Header: "Presentation",
        id : "presentation",
        Cell : row => (
          <OptionPresentation processName={processName} configName={configName} optionName={row.original.name} />
        )
      }
    ];
    const rowsPerPage = 10;
    
    return (
      <div className=".Config">
        <ReactTable
          data={data}
          columns={columns}
          showPagination={data.length > rowsPerPage}
          defaultPageSize={ rowsPerPage }
          filterable={true}
          defaultFilterMethod={ (filter, row) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined ? String(row[id]).toLocaleLowerCase().includes(filter.value.toLocaleLowerCase()) : true;
          }}
          className="-striped -highlight"
          SubComponent={
            row => {
              return (
                <OptionView processName={processName} configName={configName} optionName={row.original.name} />
              );
            }
          }
        />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch, Config, processName, configName } = this.props;

    if (Config === undefined)
    {
      dispatch(this.props.doFetchConfig( processName, configName));
      return;
    }
  }
  
  shouldComponentUpdate(nextProps) {
    const { Config } = this.props;
    
    const currentOptsNames = (Config !== undefined && Config.options !== null) ? Config.options : [];
    const nextOptsNames = (nextProps.Config !== undefined && nextProps.Config.options !== null) ? nextProps.Config.options : [];
    
    return !_.isEqual(currentOptsNames.sort(), nextOptsNames.sort());
  }  
}

function mapStateToProps (state, ownProps) {
  return {
    Config : _.find(state.Configs, c => { return c.processName === ownProps.processName && c.configName === ownProps.configName; } ),
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchConfig }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);
