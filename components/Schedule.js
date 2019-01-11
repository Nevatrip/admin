import PropTypes from 'prop-types'
import React from 'react'
import $ from "jquery"
import '@progress/kendo-ui';

import '@progress/kendo-ui/css/web/kendo.common.core.min.css?raw'
import '@progress/kendo-ui/css/web/kendo.default.min.css?raw'

export default class Schedule extends React.PureComponent {
  componentDidMount() {
    $('#scheduler').kendoScheduler({
      date: new Date(),
      startTime: new Date(),
      height: 900,
    });
    console.log( $('') );
  }

  render() {
    const {type, value, level, focusPath, onFocus, onBlur} = this.props


    return (
      <div className="schedule" id="scheduler">
        Hello
      </div>
    )
  }
}