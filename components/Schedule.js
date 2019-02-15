import uuid from '@sanity/uuid';
import React from 'react';
import PropTypes from 'prop-types';

import client from 'part:@sanity/base/client'
import {PatchEvent, set, unset, setIfMissing, insert} from 'part:@sanity/form-builder/patch-event'

import $ from 'jquery'
import '@progress/kendo-ui';
import '@progress/kendo-ui/js/messages/kendo.messages.ru-RU';
import '@progress/kendo-ui/js/kendo.timezones';
import '@progress/kendo-ui/js/cultures/kendo.culture.ru-RU';

import { RRule } from "rrule";

const createPatchFrom = value => {
  console.log( 'createPatchFrom', value );
  return PatchEvent.from(set(value));
};

export default class Schedule extends React.Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  render() {
    const { value } = this.props;

    return (
      <div>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2018.3.1017/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2018.3.1017/styles/kendo.default.min.css" />
        {/*<pre><code>{JSON.stringify(value, null, 2 )}</code></pre>*/}
        <div className="schedule" ref={ el => this.el = el } />
      </div>
    )
  }

  addEvent = ( eventArr, cb ) => {
    const { onChange } = this.props;
    const { events } = this.state;

    const newEvent = eventArr.map( event => {
      event._key = uuid();

      console.log('event.start instanceof Date', event.start instanceof Date);

      if ( event.recurrenceRule ) {
        const options = RRule.parseString(event.recurrenceRule)
        options.dtstart = new Date(event.start);
        const rrule = new RRule(options);

        event.actions = rrule.all().map((date) => {
          return {
            _key: uuid(),
            start: date.toISOString(),
            _eventId: event._key
          }
        });
      } else {
        event.actions = [{
          _key: uuid(),
          start: event.start,
          _eventId: event._key
        }]
      }

      return event;
    } );

    const newValue = JSON.parse( JSON.stringify( [ ...events, ...newEvent ] ) );
    const save = PatchEvent.from( set( newValue ) ); 

    this.setState({
      events: save.patches[0].value
    }, () => {
      onChange( save );
      cb.success( newEvent );
    })
  }

  editEvent = ( eventArr, cb ) => {
    const { onChange } = this.props;
    const { events } = this.state;
    const normalize = {};

    events.forEach( event => {
      normalize[ event._key ] = event;
    } )

    eventArr.forEach( updatedEvent => {
      normalize[ updatedEvent._key ] = updatedEvent;
    } )

    const newValue = Object.keys( normalize ).map( key => {
      return normalize[ key ]
    } );

    this.setState({
      events: newValue
    }, () => {
      const newValueJSON = JSON.parse( JSON.stringify( newValue ) );
      onChange(PatchEvent.from(set( newValueJSON )));
      cb.success(cb.data.models);
    })
  }

  deleteEvent = ( eventArr, cb ) => {
    const { onChange } = this.props;
    const { events } = this.state;
    const newValue = events.filter( event => event._key !== eventArr[0]._key )

    this.setState({
      events: newValue
    }, () => {
      const newValueJSON = JSON.parse( JSON.stringify( newValue ) );
      onChange(PatchEvent.from(set( newValueJSON )));
      cb.success(cb.data.models)
    })
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      events: value || []
    });

    kendo.culture( 'ru-RU' );

    this.$el = $( this.el );
    this.$el.kendoScheduler({
      date: new Date(),
      startTime: new Date(),
      height: 900,
      views: [
        { type: 'day' },
        { type: 'week' },
        { type: 'month', selected: true },
        { type: 'agenda' },
        { type: "timeline", eventHeight: 50 }
      ],
      timezone: 'Europe/Moscow',
      dataSource: {
          batch: true,
          transport: {
            read: response => {
              response.success(value || []);
            },
            update: response => {
              this.editEvent( response.data.models, response );
            },
            create: response => {
              this.addEvent( response.data.models, response );
            },
            destroy: response => {
              this.deleteEvent( response.data.models, response );
            },
          },
          schema: {
            type: 'json',
            // data: 'events',
            model: {
              id: '_key',
              fields: {
                _key: { from: '_key', type: 'string' },
                _type: { from: '_type', type: 'string', defaultValue: 'event' },
                start: { from: 'start' , type: 'date'},
                end: { from: 'end' , type: 'date'},
                title: { from: 'title', type: 'string', defaultValue: 'No title' },
                startTimezone: { from: 'startTimezone' },
                endTimezone: { from: 'endTimezone' },
                description: { from: 'description' },
                recurrenceId: { from: 'recurrenceID' },
                recurrenceRule: { from: 'recurrenceRule' },
                recurrenceException: { from: 'recurrenceException' },
                isAllDay: { type: 'boolean', from: 'isAllDay' }
              }
            }
          }
      },
      edit: function (e) {
        e.event.set("isAllDay", false);

        if (e.event.isNew) {
          const start = e.container.find("[name=start][data-role=datetimepicker]");
          const end = e.container.find("[name=end][data-role=datetimepicker]");
          const startTime = new Date(e.event.start);
          const endTime = new Date(startTime);
          endTime.setHours(startTime.getHours() + 1);
          $(start).data("kendoDateTimePicker").value(startTime);
          $(end).data("kendoDateTimePicker").value(endTime);

          $(start).on('change', function () {
            const newStart = $(start).data("kendoDateTimePicker").value()
            const newEnd = $(end).data("kendoDateTimePicker").value()
            
            if (newStart <= newEnd) {
              newEnd.setHours(newStart.getHours() + 1);
              $(end).data("kendoDateTimePicker").value(newEnd);
              e.event.end = newEnd;
            }
          });
          
          e.event.end = endTime;
        }
      }
    });

    this.scheduler = this.$el.data("kendoScheduler");

    const fitWidget = () => {
      var widget = this.scheduler;
      var height = $(window).outerHeight();

      //size widget to take the whole view
      widget.element.height(height);
      widget.resize(true);
    }

    $(window).resize(function() {
      clearTimeout(window._resizeId);
      window._resizeId = setTimeout(function() {
        fitWidget();
      }, 500);
    });

    setTimeout( fitWidget, 1000 );

    fitWidget();
  }

  componentWillUnmount() {
    this.scheduler && this.scheduler.destroy();
  }

  focus() {
    this.el.focus();
  }
}