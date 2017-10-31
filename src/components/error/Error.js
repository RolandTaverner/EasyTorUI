import PropTypes from "prop-types";
import React, { Component } from "react";
import "./Error.css";

class ErrorComponent extends Component {
  render() {
    const { error } = this.props;
    return (
      <div className="Error">
        {error.toString()}
      </div>
    );
  }
}

ErrorComponent.propTypes = {
  error : PropTypes.object.isRequired,
  action : PropTypes.func
};

export default ErrorComponent;
