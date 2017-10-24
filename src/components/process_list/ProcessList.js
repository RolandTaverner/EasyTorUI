import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './ProcessList.css';
import { doFetchProcessList, doFetchProcess } from '../../actions';

const columns = [
  {
    Header: "Name",
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
    id : "empty"
  }
];

class ProcessListComponent extends Component {
  render() {
    const { ProcessList } = this.props;
    const data = (ProcessList.names === null ? [] : ProcessList.names.map((p) => { return { name: p, status: "---" }; } ));
    return (
      <div className="Processes">
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          pageSize={ data.length  }
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <em>
                  You can put any component you want here, even another React
                  Table!
                </em>
                <br />

              </div>
            );
          }}
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
  
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    
  }
}

function mapStateToProps (state, ownProps) {
  return {
    ProcessList : state.ProcessList
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchProcessList }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListComponent);
