import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './TorController.css';
import { doFetchControllerInfo } from '../../actions';

import ProcessList from '../process_list/ProcessList';

class TorController extends Component {
  render() {
    const { ControllerInfo } = this.props;
    return (
      <div className="App">
        <p className="App-intro">
          PID = { ControllerInfo.pid === null ? "Loading..." : ControllerInfo.pid }
        </p>
        <div>
          {ControllerInfo.pid === null ? "" : (<ProcessList />)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { isFetching, pid } = this.props.ControllerInfo;
    const { dispatch } = this.props;

    if (pid === null && !isFetching)
    {
      dispatch(this.props.doFetchControllerInfo());
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    ControllerInfo: state.ControllerInfo
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchControllerInfo }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(TorController);
