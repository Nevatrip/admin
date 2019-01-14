import PropTypes from 'prop-types'
import React from 'react'
import $ from 'jquery'
import '@progress/kendo-ui';

export default class Schedule extends React.PureComponent {
  componentDidMount() {
    $('#scheduler').kendoScheduler({
      date: new Date(),
      startTime: new Date(),
      height: 900,
      views: [
        'day',
        'week',
        {
          type: 'month',
          selected: true
        },
        'agenda'
      ],
      timezone: 'Europe/Moscow',
    });

    console.log( $('') );
  }

  render() {
    const {type, value, level, focusPath, onFocus, onBlur} = this.props

    return (
      <>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2018.3.1017/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2018.3.1017/styles/kendo.default.min.css" />
        <div className="schedule" id="scheduler"></div>
      </>
    )
  }
}