import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import "./TorController.css";
import { doFetchControllerInfo } from "../../actions/ControllerInfo";

import PresetList from "../preset_list/PresetList";
import ProcessList from "../process_list/ProcessList";
import Section from "../section/Section";
import { OptionValue } from "../option/Option";
import { ProcessState } from "../process/Process";

class TorController extends Component {
  render() {
    const { ControllerInfo } = this.props;
    if (ControllerInfo.error !== null)
    {
      return (
        <Section headerText="CONTROLLER" bgColor="#F0FFF0">
          <p className="App-intro">
            Error: {ControllerInfo.error.toString()}
          </p>
        </Section>);
    }

    return (
      <div className="Controller">
        <Section headerText="CONTROLLER" bgColor="#F0FFF0">
          <p className="App-intro">
            PID = { ControllerInfo.pid === null ? "Loading..." : ControllerInfo.pid }
          </p>
          <table className="ImportantOptionsTable" cellSpacing="5">
            <tbody>
              <tr className="ImportantOptionsTableRow">
                <td className="ImportantOptionsTableLabel">Tor port</td>
                <td className="ImportantOptionsTableValue"><OptionValue processName="tor" configName="config" optionName="SOCKSPort"/> </td>
                <td className="ImportantOptionsTableState"><ProcessState processName="tor"/></td>
              </tr>
              <tr className="ImportantOptionsTableRow">
                <td className="ImportantOptionsTableLabel">Privoxy port</td>
                <td className="ImportantOptionsTableValue"><OptionValue processName="privoxy" configName="config" optionName="listen-address"/> </td>
                <td className="ImportantOptionsTableState"><ProcessState processName="privoxy"/></td>
              </tr>
            </tbody>
          </table>          
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
