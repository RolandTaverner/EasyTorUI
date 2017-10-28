import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import "./TorController.css";
import { doFetchControllerInfo } from "../../actions/ControllerInfo";

import PresetList from "../preset_list/PresetList";
import ProcessList from "../process_list/ProcessList";
import Section from "../section/Section";

class TorController extends Component {
  render() {
    const { ControllerInfo } = this.props;
    return (
      <div className="Controller">
        <Section headerText="CONTROLLER" bgColor="#F0FFF0">
          <p className="App-intro">
            PID = { ControllerInfo.pid === null ? "Loading..." : ControllerInfo.pid }
          </p>
        </Section>

        <Section headerText="PRESETS" bgColor="#F0FFF0">
          {ControllerInfo.pid === null ? "" : (<PresetList />)}
        </Section>

        <Section headerText="PROCESSES" bgColor="#F0FFF0">
          {ControllerInfo.pid === null ? "" : (<ProcessList />)}
        </Section>
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
