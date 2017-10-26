import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import "./TorController.css";
import { doFetchControllerInfo } from "../../actions";

import ProcessList from "../process_list/ProcessList";

class TorController extends Component {
  render() {
    const { ControllerInfo } = this.props;
    return (
      <div className="Controller">
        <div className="ControllerInfo">
          <p className="App-intro">
            PID = { ControllerInfo.pid === null ? "Loading..." : ControllerInfo.pid }
          </p>
        </div>
        <div>
          {ControllerInfo.pid === null ? "" : (<ProcessList />)}
        </div>
      </div>
    );
  }

  componentWillMount() {
    const { isFetching, pid } = this.props.ControllerInfo;
    const { dispatch } = this.props;

    if (pid === null && !isFetching)
    {
      dispatch(this.props.doFetchControllerInfo());
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.ControllerInfo.pid !== this.props.ControllerInfo.pid;
  }  
}

TorController.propTypes = {
  dispatch : PropTypes.func.isRequired,
  doFetchControllerInfo : PropTypes.func.isRequired,
  ControllerInfo : PropTypes.object
};

function mapStateToProps (state, ownProps) {
  return {
    ControllerInfo: state.ControllerInfo
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchControllerInfo }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(TorController);
