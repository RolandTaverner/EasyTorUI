import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import _ from 'lodash';
import 'react-table/react-table.css';
import './ProcessList.css';
import Process from '../process/Process';
import { doFetchProcessList, doFetchProcess } from '../../actions';


class ProcessListComponent extends Component {
  render() {
    const { dispatch, ProcessList, ProcessByName } = this.props;
    let data = [];
    if (ProcessList.names !== null)
    {
      data = ProcessList.names.map( procName => { return { name : procName, status : (_.find(ProcessByName, p => { return p.name === procName; }) || { status: "Loading" } ).status }; } );
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
        accessor: d => d.status,
        width: 100
      },
      {
        Header: "",
        id : "actions",
        accessor: d => d.name,
        Cell : row => (
          <div>
            <button onClick={() => { dispatch(this.props.doFetchProcess(row.value)); } }>Refresh</button>
          </div>
        )
      }
    ];
    
    return (
      <div className="Processes">
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          pageSize={ data.length  }
          className="-striped -highlight"
          SubComponent={
            row => {
              return (
                <Process processName={row.original.name} />
              );
            }
          }
        />
      </div>
    );
  }

  componentDidMount() {
    const { isFetching, names } = this.props.ProcessList;
    const { dispatch } = this.props;

    if (names === null && !isFetching)
    {
      dispatch(this.props.doFetchProcessList());
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    const { dispatch } = this.props;
    const currentProcessNames = this.props.ProcessList.names !== null ? this.props.ProcessList.names : [];
    if (nextProps.ProcessList.names !== null && !_.isEqual(currentProcessNames.sort(), nextProps.ProcessList.names.sort())) 
    {
      nextProps.ProcessList.names.forEach((currentValue, index, array) => { dispatch(this.props.doFetchProcess(currentValue)); });
    }
  }

  shouldComponentUpdate(nextProps) {
    const currentProcessNames = this.props.ProcessList.names !== null ? this.props.ProcessList.names : [];
    const nextProcessNames = nextProps.ProcessList.names !== null ? nextProps.ProcessList.names : [];
    if (!_.isEqual(currentProcessNames.sort(), nextProcessNames.sort()))
    {
      return true;
    }
    
    const currentProcesses = this.props.ProcessByName !== null ? this.props.ProcessByName : [];
    const nextProcesses = nextProps.ProcessByName !== null ? nextProps.ProcessByName : [];
    const compareProcesses = (a, b) => {
        return a.name.localeCompare(b.name);
    }
    
    return !_.isEqual(currentProcesses.sort(compareProcesses), nextProcesses.sort(compareProcesses));
  }
  
}

function mapStateToProps (state, ownProps) {
  return {
    ProcessList : state.ProcessList,
    ProcessByName : state.Processes.map( p => { return { name : p.name, status : p.status, isFetching : p.isFetching}; })
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchProcessList, doFetchProcess }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListComponent);
