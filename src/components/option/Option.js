import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import './Option.css';
import { doFetchOption } from '../../actions';


class OptionComponentBase extends Component {

  componentDidMount() {
    const { dispatch, Option, processName, configName, optionName } = this.props;

    if (Option === undefined)
    {
      dispatch(this.props.doFetchOption(processName, configName, optionName));
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    // const { dispatch, processName, configName, Config, Options } = this.props;
    return true;
  }  
}

function mapStateToProps (state, ownProps) {
  return {
    Option : _.find(state.Options, opt => { return opt.processName === ownProps.processName && opt.configName === ownProps.configName && opt.optionName === ownProps.optionName; })
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ doFetchOption }, dispatch);
  return { ...actions, dispatch };
}

class OptionPresentationComponent extends OptionComponentBase {
  render() {
    const { Option } = this.props;

    if (Option === undefined)
    {
      return (<div>Loading...</div>);
    }
    return (<div>{Option.presentation}</div>);
  }
}

class OptionViewComponent extends OptionComponentBase {
  render() {
    const { Option } = this.props;

    if (Option === undefined)
    {
      return (<div>Loading...</div>);
    }
    return (
      <table width='100%'>
        <tbody>
          <tr className='UIFormPair'>
            <td className='UIFormKey'>
              <label>Name</label>
            </td>
            <td className='UIFormValue'>
            {Option.optionName}
            </td>
          </tr>
          <tr className='UIFormPair'>
            <td className='UIFormKey'>
              <label>Type</label>
            </td>
            <td className='UIFormValue'>
            {Option.valueType}
            </td>
          </tr>
          <tr className='UIFormPair'>
            <td className='UIFormKey'>
              <label>System option</label>
            </td>
            <td className='UIFormValue'>
            {Option.isSystem.toString()}
            </td>
          </tr>
          <tr className='UIFormPair'>
            <td className='UIFormKey'>
              <label>Required option</label>
            </td>
            <td className='UIFormValue'>
            {Option.isRequired.toString()}
            </td>
          </tr>

        </tbody>
      </table>
      );
  }
}

export const OptionPresentation = connect(mapStateToProps, mapDispatchToProps)(OptionPresentationComponent);
export const OptionView = connect(mapStateToProps, mapDispatchToProps)(OptionViewComponent);
