import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import _ from 'lodash';
import 'react-table/react-table.css';
import './Config.css';
//import Process from '../process/Process';
import { doFetchConfig, doFetchOption } from '../../actions';


class ConfigComponent extends Component {
  render() {
    const { dispatch, Config, Options } = this.props;
    let data = [];

    if (Config === undefined)
    {
      
    }
    else
    {
      if (Config.options !== null)
      {
        data = Config.options.map( optName => { return { name : optName, presentation : (_.find(Options, opt => { return opt.name === optName; }) || { name : optName, presentation: "Loading" } ).presentation }; } );
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
        accessor: d => d.presentation,
        width: 400
      },
      {
        Header: "",
        id : "actions",
        accessor: d => d.name,
        Cell : row => (
          <div>
            
          </div>
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
          pageSize={ rowsPerPage }
          className="-striped -highlight"
          SubComponent={
            row => {
              return (
                <div>TODO: Option component {row.original.name} </div>
              );
            }
          }
        />
      </div>
    );
  }

  fetchOptions() {
    const { dispatch, processName, configName, Config } = this.props;
    Config.options.forEach( optionName => { dispatch(this.props.doFetchOption(processName, configName, optionName )); });
  }
  
  componentDidMount() {
    const { dispatch, Config, processName, configName } = this.props;

    if (Config === undefined)
    {
      dispatch(this.props.doFetchConfig( processName, configName));
      return;
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    const { dispatch, processName, configName, Config } = this.props;
    
    const currentOpts = (Config !== undefined && Config.options !== null) ? Config.options : [];
    const nextOpts = (nextProps.Config !== undefined && nextProps.Config.options !== null) ? nextProps.Config.options : [];
    
    if (!_.isEqual(currentOpts.sort(), nextOpts.sort()))
    {
      nextProps.Config.options.forEach( optionName => { dispatch(this.props.doFetchOption(processName, configName, optionName )); });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { dispatch, processName, configName, Config, Options } = this.props;
    
    const currentOptsNames = (Config !== undefined && Config.options !== null) ? Config.options : [];
    const nextOptsNames = (nextProps.Config !== undefined && nextProps.Config.options !== null) ? nextProps.Config.options : [];
    
    if (!_.isEqual(currentOptsNames.sort(), nextOptsNames.sort()))
    {
      return true;
    }
    const compareOptions = (a, b) => {
        return a.name.localeCompare(b.name);
    }
    
    return !_.isEqual(Options.sort(compareOptions), nextProps.Options.sort(compareOptions));
  }  
}

function mapStateToProps (state, ownProps) {
  return {
    Config : _.find(state.Configs, c => { return c.processName === ownProps.processName && c.configName === ownProps.configName; } ),
    Options : state.Options.filter(opt => {return opt.processName === ownProps.processName && opt.configName === ownProps.configName;} ).map(opt => { return { name : opt.optionName, presentation : opt.presentation }; })
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchConfig, doFetchOption }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);
