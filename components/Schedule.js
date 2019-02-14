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
          "}
        </style>

        <script id="customEditorTemplate" type="text/x-kendo-template">
          <div className="container-modal">
            <div className="container-fields">
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="langArray">Язык экскурсии</label></div>
                <div className="k-edit-field" data-container-for="langArray">
                  <select id="langArray"
                          data-placeholder="Type a product e.g. 'Chai'"
                          data-value-primitive="true"
                          data-text-field="ProductName"
                          data-value-field="ProductID"
                          data-bind="value: selectedProduct,
                              source: products,
                              visible: isVisible,
                              enabled: isEnabled,
                              events: {
                                change: onChange,
                                open: onOpen,
                                close: onClose
                              }"
                          data-role="multiselect"
                          required="required"></select>
                  <span className="k-error"></span>
                </div>
              </div>
              <hr/>
              <div className="outer">
                <div className="k-edit-label"><label htmlFor="title">Экскурсия</label></div>
                <div data-container-for="title" className="k-edit-field">
                  <select id="title"
                          // data-bind="[{this.state.title}]"
                          data-role="dropdownlist"
                          data-value-field="value"
                          data-text-field="text"></select>
                </div>
                <div>_______________________ {this.state.title}</div>
              </div>
              <hr/>
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
                // Языки экскурсии
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
                langArray:           { from: "langArray",          defaultValue: ['en' ,'ru'], validation: {required: true}, editable: true, nullable: true},
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
              function onChangeLang(e) {
                var langArr = this.value();
                var langArrMsg = $('#langArray').closest('.k-edit-field').find('.k-error');

                $('.langField').slideUp(0).prop("disabled", true);
                $('.langField').find('.k-textbox').prop("disabled", true).prop("required", false);

                if (langArr.length == 0) {
                  langArrMsg.html("<b>Поле обязательно для заполнения!</b>");
                } else {
                  if (langArr.indexOf('ru') != -1) {
                    langArrMsg.html("");
                  } else {
                    langArrMsg.html("<b>ВНИМАНИЕ!</b><br>Вы исключили русский язык!");
                  }

                  langArr.forEach(function (lang) {
                    $('.langField_' + lang).slideDown(0).prop("disabled", false);
                    $('.langField_' + lang).find('.k-textbox').prop("disabled", false).prop("required", true);
                  })
                }
              }

              $("#langArray").kendoMultiSelect({
                // dataBind: "langArray",
                // dataSource: {transport: {read: ['ru', 'en']}},
                value: ['ru', 'en'],
                dataTextField: "text",
                dataValueField: "value",
                placeholder: "Должен быть выбран хотя бы один язык!",
                // change: onChangeLang,
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