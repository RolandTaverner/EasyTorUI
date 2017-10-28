import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import _ from "lodash";
import "./ProcessLog.css";
import { doFetchProcessLog } from "../../actions/Log";


class ProcessLogComponent extends Component {
  render() {
    const { ProcessLog } = this.props;

    if (ProcessLog === undefined)
    {
      return <div>Loading...</div>;
    }

    let lines = ProcessLog.log !== null ? ProcessLog.log : [];
    
    return (
      <div className="LogPanel">
        {lines.map( (l, i) => <p className="LogLine" key={"LogLine" + i}>{l}</p>)}
      </div>
    );
  }

  componentWillMount() {
    const { dispatch, processName, ProcessLog } = this.props;
    const { isFetching, log } = (ProcessLog !== undefined ? ProcessLog : { isFetching : false, log : null });

    if (ProcessLog === undefined || (log === null && !isFetching))
    {
      dispatch(this.props.doFetchProcessLog(processName));
    }
  }

  
}

ProcessLogComponent.propTypes = {
  dispatch : PropTypes.func.isRequired,
  doFetchProcessLog : PropTypes.func.isRequired,
  processName : PropTypes.string.isRequired,
  ProcessLog : PropTypes.object
};

function mapStateToProps (state, ownProps) {
  return {
    ProcessLog : _.find(state.Logs, pl => { return pl.processName === ownProps.processName; })
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators( { doFetchProcessLog }, dispatch);
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessLogComponent);
