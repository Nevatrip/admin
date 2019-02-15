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


        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.1.115/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.1.115/styles/kendo.default.min.css" />
        <div className="schedule" ref={ el => this.el = el } />
        <button>Добавить событие</button>

        <style>
          {"\
            .container-modal{\
              position: relative;\
              display: flex;\
              flex-direction: column;\
              width: 100%\
            }\
            .container-fields {\
             position: relative;\
            flex: 1;\
            column-count: 2;\
            margin: 0 5px;\
          }\
          \
          .container-fields:before {\
            content: '';\
            top: 0;\
            left: 50%;\
            position: absolute;\
            height: 100%;\
            width: 1px;\
            background-color: #9a9a9a;\
          }\
          \
          .container-fields:after {\
            content: '';\
            display: table;\
            clear: both;\
          }\
          \
          .outer {\
            position: relative;\
            columns: 1;\
            page-break-inside: avoid;\
            break-inside: avoid;\
          }\
          \
          .outer:before,\
          .outer:after {\
            content: '';\
            display: table;\
          }\
          \
          .outer:after {\
            clear: both;\
          }\
          \
          .k-scheduler-edit-form .k-edit-form-container, .k-scheduler-timezones .k-edit-form-container {\
            width: 900px;\
          }\
          \
          .k-scheduler-edit-form .k-edit-field {\
            width: 50%;\
          }\
          \
          .k-scheduler-edit-form .k-edit-label {\
            width: 44%;\
          }\
          \
          .k-textbox,\
          .k-widget.k-header {\
            width: 100%;\
            min-width: 100%;\
            max-width: 100%;\
          }\
          \
          .k-window-title {\
            text-align: center;\
          }\
          \
          .k-caption {\
            font-size: 1.2em;\
            padding: 5px 0px 10px;\
          }\
          \
          .container-tables {\
            padding: 0 16px;\
          }\
          \
          .table {\
            width: 100%;\
            table-layout: auto;\
            border-collapse: collapse;\
            margin: 1px auto 16px;\
          }\
          \
          .table td,\
          .table th {\
            border: 1px solid #eee;\
            padding: .5rem;\
            text-align: center;\
          }\
          \
          .k-invalid {\
            border-color: red !important;\
          }\
          \
          .k-error {\
            display: inline-block;\
            color: red;\
            font-style: italic;\
            font-size: .8em;\
            line-height: 0.9;\
            vertical-align: bottom;\
            max-width: 100%;\
            margin-top: 2px;\
          }\
          \
          .trip-template {\
            font-size: 11px;\
          }\
          \
          .trip-template__time {\
            display: block;\
            font-weight: bold;\
          }\
          \
          .trip-template__title {\
            display: block;\
            max-width: 100%;\
            white-space: nowrap;\
            overflow: hidden;\
            text-overflow: ellipsis;\
          }\
          \
          .k-invalid-msg {\
            display: block !important;\
          }\
          \
          .langField_en {\
            background-color: #dbe3f5;\
          }\
          \
          .langField_zh {\
            background-color: #fffc97;\
          }\
          \
          .langField {\
            position: relative;\
            padding: 7px 0 0;\
            margin: 0;\
            border: none !important;\
          }\
          \
          .langField:before,\
          .langField:after {\
            content: '';\
            display: table;\
          }\
          \
          .langField:after {\
            clear: both;\
          }\
          \
          input[type=\checkbox\] {\
            top: 4px;\
            display: inline-block;\
            position: relative;\
          }\
          \
          .k-check {\
            display: inline-block;\
            padding-top: 6px;\
            padding-right: 3px;\
            font-size: 11px;\
            text-transform: lowercase;\
          }\
          \
          input.k-recur-weekday-checkbox {\
            margin: 0;\
          }\
          \
          .k-edit-field > ul.k-reset > li {\
            margin: 0.4em 0 0;\
            line-height: inherit;\
          }\
          \
          .k-edit-field > ul.k-reset {\
            margin-bottom: 5px;\
          }\
          \
          .k-edit-field > ul.k-reset .k-datepicker, .k-edit-field > ul.k-reset .k-dropdown, div[name=recurrenceRule] > .k-dropdown {\
            width: 100%;\
            display: block;\
            position: relative;\
            margin-left: 0;\
          }\
          .container-additionally{\
            clear: both;\
            position: relative;\
            margin: 10px 5px;\
          }\
          .k-widget.k-dropdown.k-header.k-recur-weekday-offset,\
          .k-widget.k-dropdown.k-header.k-recur-weekday,\
          .k-widget.k-datepicker.k-header.k-recur-until,\
          .k-widget.k-dropdown.k-header.k-recur-month{\
            width: 44%;\
            max-width: 44%;\
            min-width: 44%;\
            font-size: 12px;\
            margin-right: 2px;\
            margin-bottom: 4px;\
            display: inline-block;\
          }\
          .k-widget.k-datepicker.k-header.k-recur-until {\
            margin-left: 10px;\
          }\
          .k-widget.k-numerictextbox.k-recur-interval {\
            margin-right: 10px;\
          }\
          .k-widget.k-numerictextbox.k-recur-count {\
            margin-right: 5px;\
          }\
          .k-widget.k-dropdown, k-widget.k-datetimepicker {\
              width: 100%;\
              max-width: 100%;\
          }\
          "}
        </style>

        <script id="customEditorTemplate" type="text/x-kendo-template">
          <div className="container-modal">
            <div className="container-fields">
              {/*Экскурсия*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="title">Экскурсия</label></div>
                <div data-container-for="title" className="k-edit-field">
                  <input id="title"
                         name="title"
                         type="text"
                         className="k-input k-textbox"/>
                </div>
              </div>

              {/*API*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="tripApi">API</label></div>
                <div data-container-for="tripApi" className="k-edit-field">
                  <select id="tripApi"
                          data-bind="value:tripApi"
                          data-role="dropdownlist"
                          data-value-field="value"
                          data-text-field="text"></select>
                </div>
              </div>

              <hr/>

              {/*Весь день*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="isAllDay">Весь день</label></div>
                <div data-container-for="isAllDay" className="k-edit-field">
                  <input type="checkbox" name="isAllDay" data-type="boolean" data-bind="checked:isAllDay"/>
                </div>
              </div>

              {/*Начало*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="start">Начало</label></div>
                <div data-container-for="start" className="k-edit-field">
                  <input type="text"
                         data-role="datetimepicker"
                         data-interval="15"
                         data-type="date"
                         data-bind="value:start,invisible:isAllDay"
                         name="start"/>
                  <input type="text" data-type="date" data-role="datepicker" data-bind="value:start,visible:isAllDay"
                         name="start"/>
                  <span data-bind="text: startTimezone"></span>
                  <span data-for="start" className="k-invalid-msg" style={{display: 'none'}}></span>
                </div>
              </div>

              {/*Конец*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="end">Конец</label></div>
                <div data-container-for="end" className="k-edit-field">
                  <input type="text" data-type="date" data-role="datetimepicker"
                         data-bind="value:end,invisible:isAllDay"
                         name="end" data-datecompare-msg="Окончание должно быть позже, чем начало"/>
                  <input type="text" data-type="date" data-role="datepicker" data-bind="value:end,visible:isAllDay"
                         name="end"
                         data-datecompare-msg="Окончание должно быть позже, чем начало"/>
                  <span data-bind="text: endTimezone"></span>
                  <span data-bind="text: startTimezone, invisible: endTimezone"></span>
                  <span data-for="end" className="k-invalid-msg" style={{display: 'none'}}></span>
                </div>
              </div>

              {/*Прекратить продажу*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="buyTime">Прекратить продажу</label></div>
                <div data-container-for="buyTime" className="k-edit-field">
                  <input type="text"
                         data-role="datetimepicker"
                         data-interval="15"
                         data-type="date"
                         data-bind="value:buyTime,invisible:isAllDay"
                         name="buyTime"/>
                  <input type="text" data-type="date" data-role="datepicker" data-bind="value:buyTime,visible:isAllDay"
                         name="buyTime"/>
                  <span data-bind="text: startTimezone"></span>
                  <span data-for="buyTime" className="k-invalid-msg" style={{display: 'none'}}></span>
                </div>
              </div>

              {/*Расписание из API*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="isApiSchedule">Расписание из API</label></div>
                <div data-container-for="isApiSchedule" className="k-edit-field">
                  <div data-bind="value:isApiSchedule" name="isApiSchedule" data-role=""></div>
                </div>
              </div>

              {/*Повторять*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="recurrenceRule">Повторять</label></div>
                <div data-container-for="recurrenceRule" className="k-edit-field">
                  <div data-bind="value:recurrenceRule" name="recurrenceRule" data-role="recurrenceeditor"></div>
                </div>
              </div>

              {/*Тип времени*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="ticketType">Тип времени</label></div>
                <div data-container-for="ticketType" className="k-edit-field">
                  <select id="ticketType" data-bind="value:ticketType"
                          data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
                </div>
              </div>

              <hr/>

              {/*Причал отправления*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="pierStartId">Причал отправления</label></div>
                <div data-container-for="pierStartId" className="k-edit-field">
                  <select id="pierStartId" data-bind="value:pierStartId"
                          data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
                </div>
              </div>

              {/*Причал прибытия*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="pierFinishId">Причал прибытия</label></div>
                <div data-container-for="pierFinishId" className="k-edit-field">
                  <select id="pierFinishId" data-bind="value:pierFinishId"
                          data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
                </div>
              </div>

              {/*Карта маршрута*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="mapUrl">Карта маршрута</label></div>
                <div data-container-for="mapUrl" className="k-edit-field">
                  <input type="text" className="k-input k-textbox" name="mapUrl" data-bind="value:mapUrl"/>
                  {/*(может быть разная на одном направлении)*/}
                </div>
              </div>

              {/*Транспортное средство*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="vehicleId">Транспортное средство</label></div>
                <div data-container-for="vehicleId" className="k-edit-field">
                  <select id="vehicleId" data-bind="value:vehicleId"
                          data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
                </div>
              </div>

              <hr/>

              {/*Заметка для менеджера*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="description">Заметка для менеджера</label></div>
                <div data-container-for="description" className="k-edit-field">
                    <textarea name="description" className="k-textbox" data-bind="value:description"></textarea>
                </div>
              </div>

              <hr/>

              {/*Количество билетов*/}
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="count">Количество билетов</label></div>
                <div data-container-for="count" className="k-edit-field">
                  <input name="count" className="k-textbox" data-bind="value:count"/>
                </div>
              </div>
            </div>

            {/*Билеты*/}
            <div className="container container-additionally">
              <hr/>
              <h3>Билеты</h3>
              <div id="grid-ticket"></div>
            </div>

            {/*Доп. услуги*/}
            <div className="container container-additionally">
              <hr/>
              <h3>Доп. услуги</h3>
              <div id="grid-additional"></div>
            </div>

          </div>
        </script>

        <script id="event-template" type="text/x-kendo-template">
          <div className="trip-template" title="#:title#">
            <span className="trip-template__time">#:kendo.toString(start, "hh:mm")#</span>
            <span className="trip-template__title">&nbsp;&nbsp;#:title#</span>
          </div>
        </script>

        {/*<pre><code>{ JSON.stringify( (value || []).map( ({ _key, title }) => ({ _key, title }) ), null, 2 ) }</code></pre>*/}
      </div>
    )
  }

  addEvent = ( eventArr, cb ) => {
    const { onChange } = this.props;
    const { events } = this.state;

    const newEvent = eventArr.map( event => {
      event._key = uuid();
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

  async componentDidMount() {
    const { value, onChange, type } = this.props;
    this.setState({
      events: value || []
    });

    kendo.culture( 'ru-RU' );

    const baseURI = window.location.pathname;
    const serviceID = baseURI.split(';')[(baseURI.split(';')).length - 1];
    const query = `*[_id == "${serviceID}"]`;
    const params = {};
    const servceObj = (await client.fetch(query, params))[0];

    this.$el = $( this.el );
    this.$el.kendoScheduler({
      date: new Date(),
      startTime: new Date(),
      height: 900,
      views: [
        { type: 'day' },
        { type: 'week' },
        { type: 'month', selected: true },
        { type: 'agenda' }
      ],
      timezone: 'Europe/Moscow',
      dataSource: {
          batch: true,
          transport: {
            read: response => {
              response.success(value || []);
            },
            update: response => {
              this.editEvent( response.data.models, response )
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
            data: "model",
            total: "total",
            // data: 'events',
            model: {
              id: '_key',
              fields: {
                _key:                { from: '_key',               type: 'string' },
                _type:               { from: '_type',              type: 'string', defaultValue: 'event' },
                start:               { from: 'start' ,             type: 'date'},
                end:                 { from: 'end' ,               type: 'date'},
                title:               { from: 'title',              type: 'string', defaultValue: servceObj.title.ru.name},
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
      editable: {
        template: $("#customEditorTemplate").html(),
      },
      edit:
        (e) => {

          this.setState({
              title: servceObj.title.ru.name,
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
    this.scheduler.destroy();
  }



  focus() {
    this.el.focus();
  }
}