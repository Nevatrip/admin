import uuid from '@sanity/uuid';
import React from 'react';
import PropTypes from 'prop-types';

import client from 'part:@sanity/base/client'
import {PatchEvent, set, unset, setIfMissing, insert} from 'part:@sanity/form-builder/patch-event'

import $ from 'jquery'
import '@progress/kendo-ui';
import '@progress/kendo-ui/js/kendo.all';
import '@progress/kendo-ui/js/messages/kendo.messages.ru-RU';
import '@progress/kendo-ui/js/kendo.timezones';
import '@progress/kendo-ui/js/kendo.multiselect';
import '@progress/kendo-ui/js/cultures/kendo.culture.ru-RU';

import { RRule } from "rrule";
import { dateutil } from "rrule/dist/esm/src/dateutil";

import './Schedule.css';
import { ScheduleEvent } from "./ScheduleEvent";
import { ScheduleModal } from "./ScheduleModal";

const createPatchFrom = value => {
  console.log( 'createPatchFrom', value );
  return PatchEvent.from(set(value));
};

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: this.props.value || []
    };
  }

  render() {
    const { events } = this.state;

    const getNoun = (number, one, two, five) => {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return five;
      }
      n %= 10;
      if (n === 1) {
        return one;
      }
      if (n >= 2 && n <= 4) {
        return two;
      }
      return five;
    }

    return (
      <div>
        <ScheduleEvent />
        <ScheduleModal />
        <link rel="stylesheet" href={`http://kendo.cdn.telerik.com/${kendo.version}/styles/kendo.common.min.css`} />
        <link rel="stylesheet" href={`http://kendo.cdn.telerik.com/${kendo.version}/styles/kendo.default.min.css`} />
        <details>
          <summary>В календаре {events.length || 'нет'} {getNoun(events.length, 'событие', 'события', 'событий')}</summary>
          <pre><code>{JSON.stringify(events, null, 2 )}</code></pre>
        </details>
        <div className="schedule" ref={ el => this.el = el } />
      </div>
    )
  }

  addEvent = ( eventArr, cb ) => {
    const { onChange } = this.props;
    const { events } = this.state;

    const newEvent = eventArr.map( event => {
      event._key = uuid();

      if ( event.recurrenceRule ) {
        const options = RRule.parseString(event.recurrenceRule)
        options.dtstart = new Date(event.start);
        const rrule = new RRule(options);
        
        event.actions = rrule.all().map((date) => {
          return {
            _key: uuid(),
            start: date.toISOString(),
          }
        });
      } else {
        event.actions = [{
          _key: uuid(),
          start: event.start,
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

      if ( updatedEvent.recurrenceRule ) {
        const options = RRule.parseString(updatedEvent.recurrenceRule)
        options.dtstart = new Date(updatedEvent.start);
        const rrule = new RRule(options);
        
        const excludeDates = updatedEvent.recurrenceException
          .split(',')
          .map(date => dateutil.untilStringToDate(date))
          .reduce((acc, date) => {
            acc[date.toISOString()] = date;
            
            return acc;
          }, {});

        updatedEvent.actions = rrule.all()
          .filter( date => !excludeDates.hasOwnProperty( date.toISOString() ) )
          .map((date) => {
          return {
            _key: uuid(),
            start: date.toISOString(),
          }
        });
      } else {
        updatedEvent.actions = [{
          _key: uuid(),
          start: updatedEvent.start,
        }]
      }

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

  async componentDidMount() {
    const { events } = this.state;

    kendo.culture( 'ru-RU' );

    const baseURI = window.location.pathname;
    const serviceID = baseURI.split(';')[1];
    const serviceObj = await client.getDocument(serviceID);

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
              response.success(events);
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
            model: {
              id: '_key',
              fields: {
                _key:                { from: '_key',               type: 'string' },
                _type:               { from: '_type',              type: 'string', defaultValue: 'event' },
                start:               { from: 'start' ,             type: 'date'},
                end:                 { from: 'end' ,               type: 'date'},
                title:               { from: 'title',              type: 'string', defaultValue: (((serviceObj || {}).title || {}).ru || {}).name || ''},
                startTimezone:       { from: 'startTimezone' },
                endTimezone:         { from: 'endTimezone' },
                description:         { from: 'description' },
                recurrenceId:        { from: 'recurrenceID' },
                recurrenceRule:      { from: 'recurrenceRule' },
                recurrenceException: { from: 'recurrenceException' },
                isAllDay:            { from: 'isAllDay',           type: 'boolean'  },
              }
            }
          }
      },
      eventTemplate: $("#event-template").html(),
      // editable: {
      //   template: $("#customEditorTemplate").html(),
      // },
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
          e.event.set('startTimezone', 'Europe/Moscow');
        }
      
        /*
        this.setState({
            title: serviceObj.title.ru.name,
          },
          ()=> {

            $('#grid-ticket').kendoGrid({
              dataSource: new kendo.data.DataSource({
                pageSize: 6,
                data: [
                  {
                    productID: 1,
                    productName: "Взрослый",
                    price: 320,
                    buyed: 50,
                    description: "Bla-bla-bla…"
                  }, {
                    productID: 2,
                    productName: "Детский",
                    price: 280,
                    buyed: 50,
                    description: "Bla-bla-bla…"
                  }, {
                    productID: 3,
                    productName: "Льготный",
                    price: 260,
                    buyed: 50,
                    description: "Bla-bla-bla…"
                  }
                ],
                autoSync: true,
                schema: {
                  model: {
                    id: "productID",
                    fields: {
                      productID: {editable: false, nullable: true},
                      productName: {defaultValue: "Взрослый", validation: {required: true}},
                      description: {defaultValue: ""},
                      price: {type: "number", validation: {required: true, min: 0}},
                      buyed: {editable: false, type: "number", validation: {min: 0}},
                    }
                  }
                }
              }),
              pageable: false,
              // height: 550,
              toolbar: ["create"],
              columns: [
                {field: "productName", title: "Билет"},
                // { field: "description", title: "Описание" },
                {field: "price", title: "Стоимость", format: "{0:c}"},
                {field: "buyed", title: "Продано"},
                {command: "destroy", title: " "}],
              editable: true
            });

            $('#grid-additional').kendoGrid({
              dataSource: new kendo.data.DataSource({
                pageSize: 6,
                data: [
                  {
                    productID: 1,
                    productName: "Дождевик",
                    price: 320,
                    description: "Bla-bla-bla…"
                  }, {
                    productID: 2,
                    productName: "Зонт",
                    price: 280,
                    description: "Bla-bla-bla…"
                  }, {
                    productID: 3,
                    productName: "Кокаин",
                    price: 260,
                    description: "Bla-bla-bla…"
                  }
                ],
                autoSync: true,
                schema: {
                  model: {
                    id: "productID",
                    fields: {
                      productID: {editable: false, nullable: true},
                      productName: {defaultValue: "Взрослый", validation: {required: true}},
                      description: {defaultValue: ""},
                      price: {type: "number", validation: {required: true, min: 0}}
                    }
                  }
                }
              }),
              pageable: false,
              // height: 550,
              toolbar: ["create"],
              columns: [
                {field: "productName", title: "Билет"},
                // { field: "description", title: "Описание" },
                {field: "price", title: "Стоимость", format: "{0:c}"},
                {command: "destroy", title: " "}],
              editable: true
            });

          }
        );
        */
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