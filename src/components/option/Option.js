import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import _ from "lodash";

import Select from "react-select";
import "react-select/dist/react-select.css";

import "./Option.css";
import { doFetchOption, doPutSetListOptionValue, doPutSetSingleOptionValue } from "../../actions/Option";

class ValueEditorComponent extends Component {

  onSaveValue(newValue) {
    this.props.onSaveValue(newValue);
  }
}

ValueEditorComponent.propTypes = {
  optionName : PropTypes.string.isRequired,
  onSaveValue : PropTypes.func.isRequired,
  domain : PropTypes.array
};

class SingleValueEditorComponent extends ValueEditorComponent
{
  constructor(props) {
    super(props);
    this.state = 
      {
        newValue : this.props.initialValue,
        changed : false
      };
  }

  handleOnChange (newValue) {
    this.setState( { newValue : newValue, changed : true } );
  }

  handleSaveButtonPress() {
    const { newValue, changed } = this.state;
    const { onSaveValue } = this.props;
    if (changed) {
      onSaveValue(newValue);
    }
  }

  render() {
    const { domain, initialValue } = this.props;
    const { newValue, changed } = this.state;
    const selectValue = changed  ? newValue : initialValue;

    const selectOptions = domain ? domain.map(e => { return {value : e, label : e }; }) : [];

    return (
      <div className="ValueEditorComponent">
        <div className="SingleValueEditorValue">
          {
            domain !== null ? 
              (
                <Select
                  name="ListValueEditor"
                  multi={false}
                  simpleValue
                  options={selectOptions}
                  onChange={this.handleOnChange.bind(this)}
                  value={selectValue}
                />
              ) :
              (
                <input className="SingleValueEditorInput" type="text" value={selectValue} onChange={ e => this.handleOnChange.bind(this)(e.target.value ) } />
              )
          }
        </div>
        <div className="ValueEditorButtons">
          <button
            className="ValueEditorSaveButton"
            disabled={!changed}
            onClick={() => { this.handleSaveButtonPress(); }}>
              Save
          </button>
        </div>
      </div>
    );
  }

}

class ListValueEditorComponent extends ValueEditorComponent
{
  constructor(props) {
    super(props);
    this.state = 
      {
        newValue : this.props.initialValue ? this.props.initialValue : [],
        changed : false
      };
  }

  handleOnChange(newValue) {
    this.setState( { newValue : newValue.map(v => v.value), changed : true } );
  }

  handleSaveButtonPress() {
    const { newValue, changed } = this.state;
    const { onSaveValue } = this.props;
    if (changed) {
      onSaveValue(newValue);
    }
  }

  render() {
    const { domain, initialValue } = this.props;
    const { newValue, changed } = this.state;
    const selectValue = changed  ? newValue : initialValue;

    const selectOptions = domain ?
      domain.map(e => { return {value : e, label : e }; }) :
      (selectValue ? selectValue.map(e => { return { value : e, label : e }; }) : []);

    return (
      <div className="ValueEditorComponent">
        <div className="ListValueEditorValue">
          {
            domain !== null ? 
              (
                <Select
                  name="ListValueEditor"
                  multi={true}
                  options={selectOptions}
                  onChange={this.handleOnChange.bind(this)}
                  value={selectValue}
                />
              ) :
              (
                <Select.Creatable
                  name="ListValueEditor"
                  multi={true}
                  options={selectOptions}
                  onChange={this.handleOnChange.bind(this)}
                  value={selectValue}
                />
              )
          }
        </div>
        <div className="ValueEditorButtons">
          <button
            className="ValueEditorSaveButton"
            disabled={!changed}
            onClick={() => { this.handleSaveButtonPress(); }}>
              Save
          </button>
        </div>
      </div>
    );
  }
}

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
  checked : PropTypes.bool.isRequired
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
  
  componentWillMount() {
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
  doPutSetListOptionValue : PropTypes.func.isRequired,
  doPutSetSingleOptionValue : PropTypes.func.isRequired,
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
  let actions = bindActionCreators({ doFetchOption, doPutSetListOptionValue, doPutSetSingleOptionValue }, dispatch);
  return { ...actions, dispatch };
}

class OptionPresentationComponent extends OptionComponentBase {

  render() {
    const { Option } = this.props;

    if (Option === undefined || Option.isFetching === true)
    {
      return (<div>Loading...</div>);
    }
    if (Option.presentation === undefined || Option.presentation === null)
    {
      return <div/>;
    }
    
    const items = Option.presentation.split(/(?:\\[rn]|[\r\n]+)+/).map((i, index) => <p className="PresentationItem" key={index}>{i}</p>);
    return items;
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
                Option.isSystem ?
                  (
                    Option.value !== undefined ?
                      (
                        Option.isList ? 
                          <ListComponent optionName={Option.optionName} attrName={"value"} values={Option.value} /> :
                          Option.value
                      ) : <div/>
                  ) :
                  (
                    Option.isList ?
                      <ListValueEditorComponent
                        optionName={Option.optionName}
                        initialValue={Option.value !== undefined ? Option.value : null}
                        domain={Option.valueType === "domain" ? Option.domain : null}
                        onSaveValue={newValue => this.onListValueOptionChanged(newValue)} /> :
                      <SingleValueEditorComponent
                        optionName={Option.optionName}
                        initialValue={Option.value !== undefined ? Option.value : null}
                        domain={Option.valueType === "domain" ? Option.domain : null}
                        onSaveValue={newValue => this.onSingleValueOptionChanged(newValue)} />
                  )
              }
            </td>
          </tr>

        </tbody>
      </table>
    );
  }

  onSingleValueOptionChanged(newValue) {
    const { dispatch, processName, configName, optionName } = this.props;

    if (newValue !== null && newValue.length > 0) {
      dispatch(this.props.doPutSetSingleOptionValue(processName, configName, optionName, newValue));
    } else {

    }
  }

  onListValueOptionChanged(newValue) {
    const { dispatch, processName, configName, optionName } = this.props;

    if (newValue !== null && newValue.length > 0) {
      dispatch(this.props.doPutSetListOptionValue(processName, configName, optionName, newValue));
    } else {

    }

  }
}

export const OptionPresentation = connect(mapStateToProps, mapDispatchToProps)(OptionPresentationComponent);
export const OptionView = connect(mapStateToProps, mapDispatchToProps)(OptionViewComponent);
