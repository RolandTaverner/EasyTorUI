import PropTypes from "prop-types";
import React, { Component } from "react";
import "./Section.css";

class SectionComponent extends Component {
  render() {
    return (
      <div className="Section" style={{"backgroundColor": this.props.bgColor}}>
        <div className="SectionHeader">
          <div className="SectionHeaderText">{this.props.headerText}</div>
        </div>

        <div className="SectionContents">
          {this.props.children}
        </div>
      </div>
    );
  }
}

SectionComponent.propTypes = {
  headerText : PropTypes.string.isRequired,
  bgColor : PropTypes.string.isRequired
};

export default SectionComponent;
