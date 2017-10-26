import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import _ from "lodash";
import "./Option.css";
import { doFetchOption } from "../../actions";


class CheckboxComponent extends Component {
  render() {
    const { optionName, attrName, checked } = this.props;
    return (
      <div className="UIFormValueCheckBox">
        {checked ?
          <input type="checkbox" value="1" id={optionName + attrName} checked disabled /> :
          <input type="checkbox" value="0" id={optionName + attrName} disabled /> }
        <label htmlFor={optionName + attrName}></label>
      </div>
    );  
  }
}

CheckboxComponent.propTypes = {
  optionName : PropTypes.string.isRequired,
  attrName : PropTypes.string.isRequired,
  checked : PropTypes.bool.isRequired,
};

class ListComponent extends Component {
  render() {
    const { optionName, attrName, values } = this.props;
    const lis = values.map( (v, i) => <li className="UIFormValueListItem" key={attrName + i}>{v}</li> );
    return (
      <ul className="UIFormValueList" id={optionName + attrName}>
        {lis}
      </ul>
    );  
  }
}

ListComponent.propTypes = {
  optionName : PropTypes.string.isRequired,
  attrName : PropTypes.string.isRequired,
  values : PropTypes.array.isRequired,
};

class OptionComponentBase extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.Option === undefined)
    {
      nextProps.dispatch(nextProps.doFetchOption(nextProps.processName, nextProps.configName, nextProps.optionName));
    }
  }
  
  componentDidMount() {
    const { dispatch, Option, processName, configName, optionName } = this.props;

    if (Option === undefined)
    {
      dispatch(this.props.doFetchOption(processName, configName, optionName));
    }
  }

  shouldComponentUpdate(nextProps) {
    const { Option } = this.props;
  
    return !_.isEqual(Option, nextProps.Option);
  }  
}

OptionComponentBase.propTypes = {
  dispatch : PropTypes.func.isRequired,
  doFetchOption : PropTypes.func.isRequired,
  Option : PropTypes.object,
  processName : PropTypes.string.isRequired,
  configName : PropTypes.string.isRequired,
  optionName : PropTypes.string.isRequired
};

function mapStateToProps (state, ownProps) {
  return {
    Option : _.find(state.Options, opt => { return opt.processName === ownProps.processName && opt.configName === ownProps.configName && opt.optionName === ownProps.optionName; })
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchOption }, dispatch);
  return { ...actions, dispatch };
}

class OptionPresentationComponent extends OptionComponentBase {

  render() {
    const { Option } = this.props;

    if (Option === undefined || Option.isFetching === true)
    {
      return (<div>Loading...</div>);
    }
    return (<div>{Option.presentation}</div>);
  }
}

class OptionViewComponent extends OptionComponentBase {

  render() {
    const { Option } = this.props;

    if (Option === undefined || Option.isFetching === true)
    {
      return (<div>Loading...</div>);
    }
    return (
      <table className="UIForm" cellSpacing="5">
        <tbody>
          <tr className="UIFormPair">
            <td className="UIFormKey">
              <label>Name</label>
            </td>
            <td className="UIFormValue">
              {Option.optionName}
            </td>
          </tr>
          <tr className="UIFormPair">
            <td className="UIFormKey">
              <label>Type</label>
            </td>
            <td className="UIFormValue">
              {Option.valueType}
            </td>
          </tr>
          {Option.valueType === "domain" ? 
            (<tr className="UIFormPair">
              <td className="UIFormKey">
                <label>Domain</label>
              </td>
              <td className="UIFormValue">
                <ListComponent optionName={Option.optionName} attrName={"domain"} values={Option.domain} />
              </td>
            </tr>) : (null)
          }
          <tr className="UIFormPair">
            <td className="UIFormKey">
              <label>System</label>
            </td>
            <td className="UIFormValue">
              <CheckboxComponent optionName={Option.optionName} attrName={"isSystem"} checked={Option.isSystem} />
            </td>
          </tr>
          <tr className="UIFormPair">
            <td className="UIFormKey">
              <label>Required</label>
            </td>
            <td className="UIFormValue">
              <CheckboxComponent optionName={Option.optionName} attrName={"isRequired"} checked={Option.isRequired} />
            </td>
          </tr>
          <tr className="UIFormPair">
            <td className="UIFormKey">
              <label>Multivalue</label>
            </td>
            <td className="UIFormValue">
              <CheckboxComponent optionName={Option.optionName} attrName={"isList"} checked={Option.isList} />
            </td>
          </tr>
          { Option.defaultValue !== undefined ? 
            <tr className="UIFormPair">
              <td className="UIFormKey">
                <label>Default value</label>
              </td>
              <td className="UIFormValue">
                { Option.isList ? 
                  <ListComponent optionName={Option.optionName} attrName={"defaultValue"} values={Option.defaultValue} /> :
                  Option.defaultValue
                }
              </td>
            </tr> : (null)}
          <tr className="UIFormPair">
            <td className="UIFormKey">
              <label>Value</label>
            </td>
            <td className="UIFormValue">
              {
                Option.value !== undefined ?
                  (
                    Option.isList ? 
                      <ListComponent optionName={Option.optionName} attrName={"value"} values={Option.value} /> :
                      Option.value
                  ) : (null)
              }
            </td>
          </tr>

        </tbody>
      </table>
    );
  }
}

export const OptionPresentation = connect(mapStateToProps, mapDispatchToProps)(OptionPresentationComponent);
export const OptionView = connect(mapStateToProps, mapDispatchToProps)(OptionViewComponent);
