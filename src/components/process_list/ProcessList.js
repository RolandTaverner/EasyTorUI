import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import _ from "lodash";
import "react-table/react-table.css";
import "./ProcessList.css";
import { ProcessView, ProcessState, ProcessActions } from "../process/Process";
import { doFetchProcessList } from "../../actions";


class ProcessListComponent extends Component {
  render() {
    const { ProcessList } = this.props;
    let data = [];
    if (ProcessList.names !== null)
    {
      data = ProcessList.names.map( procName => { return { name : procName }; } );
    }

    const columns = [
      {
        Header: "Process",
        id : "name",
        accessor: d => d.name,
        width: 100
      },
      {
        Header: "Status",
        id : "status",
        width: 100,
        Cell : row => ( <ProcessState processName={row.original.name} /> )
      },
      {
        Header: "",
        id : "actions",
        Cell : row => (
          <ProcessActions processName={row.original.name} />
        )
      }
    ];
    
    return (
      <div className="Processes">
        <div className="ProcessesHeader">PROCESSES</div>
        <div className="ProcessesTable">
          <ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            pageSize={ data.length  }
            className="-striped -highlight"
            SubComponent={
              row => {
                return (
                  <ProcessView processName={row.original.name} />
                );
              }
            }
          />
        </div>
      </div>
    );
  }

  componentWillMount() {
    const { isFetching, names } = this.props.ProcessList;
    const { dispatch } = this.props;

    if (names === null && !isFetching)
    {
      dispatch(this.props.doFetchProcessList());
    }
  }

  shouldComponentUpdate(nextProps) {
    const currentProcessNames = this.props.ProcessList.names !== null ? this.props.ProcessList.names : [];
    const nextProcessNames = nextProps.ProcessList.names !== null ? nextProps.ProcessList.names : [];
    return !_.isEqual(currentProcessNames.sort(), nextProcessNames.sort());
  }
  
}

ProcessListComponent.propTypes = {
  dispatch : PropTypes.func.isRequired,
  doFetchProcessList : PropTypes.func.isRequired,
  ProcessList : PropTypes.object
};

function mapStateToProps (state, ownProps) {
  return {
    ProcessList : state.ProcessList
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators( { doFetchProcessList }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListComponent);
