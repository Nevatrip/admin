import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

import { PatchEvent, set, unset, setIfMissing } from 'part:@sanity/form-builder/patch-event';

import nanoid from 'nanoid';
import { RRule } from "rrule";
import { dateutil } from "rrule/dist/esm/src/dateutil";



import $ from 'jquery'
import '@progress/kendo-ui';
import '@progress/kendo-ui/js/kendo.all';
import '@progress/kendo-ui/js/messages/kendo.messages.ru-RU';
import '@progress/kendo-ui/js/kendo.timezones';
import '@progress/kendo-ui/js/cultures/kendo.culture.ru-RU';

import '../../node_modules/@progress/kendo-ui/css/web/kendo.common.min.css?raw';
import '../../node_modules/@progress/kendo-ui/css/web/kendo.material.min.css?raw';
import './Schedule.css';

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

const createPatchEvent = value => PatchEvent.from(set(value));

const createOrEditEvent = ({ success, data: { models: [event] } }) => {
  switch (typeof event.point) {
    case 'string':
      event.point = {
        _ref: event.point,
        _type: 'reference',
      };
      break;
    case 'object':
      event.point = {
        _ref: event.point._ref,
        _type: 'reference',
      };
      break;
    default: delete event.point;
  }

  if (event.tickets) {
    event.tickets.forEach(ticket => {
      delete ticket.text;

      ticket.category = {
        _ref: ticket.category._id,
        _type: 'reference',
      }
    });
  }

  if (event.recurrenceRule) {
    const options = RRule.parseString(event.recurrenceRule)
    options.dtstart = new Date(event.start);
    const rrule = new RRule(options);

    const excludeDates = event.recurrenceException ? event.recurrenceException
      .split(',')
      .map(date => dateutil.untilStringToDate(date))
      .reduce((acc, date) => {
        acc[date.toISOString()] = date;

        return acc;
      }, {}) : [];

    event.actions = rrule.all()
      .filter(date => !excludeDates.hasOwnProperty(date.toISOString()))
      .map((date) => {
        return {
          _key: nanoid(),
          start: date.toISOString(),
        }
      });
  } else {
    event.actions = [{
      _key: nanoid(),
      start: event.start,
    }]
  }

  Object.keys(event).forEach(key => {
    if (!event[key]) {
      delete event[key]
    }
  });

  success(event);
}

const Schedule = ({ onChange, value = [] }) => {
  const ref = useRef();
  const [events, setEvents] = useState(value);

  useEffect(() => {
    onChange(createPatchEvent(JSON.parse(JSON.stringify(events))));
  }, [events])

  useEffect(() => {
    const $elmt = $(ref.current);

    const baseURI = window.location.pathname;
    const serviceID = baseURI.split(';')[1];

    kendo.culture('ru-RU');
    $elmt.kendoScheduler({
      date: new Date(),
      startTime: new Date(),
      height: 900,
      views: [
        // { type: 'day' },
        // { type: 'week' },
        { type: 'month', selected: true },
        // { type: 'agenda' },
        // { type: "timeline", eventHeight: 50 }
      ],
      timezone: 'Europe/Moscow',
      messages: {
        editor: {
          allDayEvent: "Время неизвестно"
        }
      },
      dataSource: {
        batch: true,
        transport: {
          read: response => {
            response.success(events);
          },
          update: createOrEditEvent,
          create: createOrEditEvent,
          destroy: ({ success, data: { models: [event] } }) => {
            success(event);
          },
        },
        schema: {
          model: {
            id: '_key',
            fields: {
              _key: { from: '_key', type: 'string', },
              _type: { from: '_type', type: 'string', defaultValue: 'event' },
              title: { from: 'title', type: 'string', defaultValue: 'No title' },
              start: { from: 'start', type: 'date', },
              end: { from: 'end', type: 'date', },
              startTimezone: { from: 'startTimezone', type: 'string', },
              endTimezone: { from: 'endTimezone', type: 'string', },
              description: { from: 'description', type: 'string', },
              recurrenceId: { from: 'recurrenceID', type: 'string', defaultValue: '' },
              recurrenceRule: { from: 'recurrenceRule', type: 'string', defaultValue: '' },
              recurrenceException: { from: 'recurrenceException', type: 'string', defaultValue: '' },
              isAllDay: { from: 'isAllDay', type: 'boolean', defaultValue: false },
              openTime: { from: 'openTime', type: 'boolean', defaultValue: false, nullable: false },
              point: { from: 'point', type: 'object', nullable: false },
              tickets: { from: 'tickets', type: 'array', nullable: false },
            }
          }
        }
      },
      resources: [
        {
          field: "openTime",
          dataSource: [
            { text: "Да", value: true, color: "#00fa9a" },
            { text: "Нет", value: false, color: "#1e90ff" },
          ],
          title: "Открытое время"
        },
        /*
        {
          field: "point",
          valuePrimitive: false,
          dataSource: {
            transport: { read: { url: "https://39dycnz5.api.sanity.io/v1/data/query/develop?query=*[_type==%22point%22]{%22_ref%22:_id,%22text%22:title.ru}" } },
            schema: {
              data: function (response) {
                return response.result;
              },
            }
          },
          dataValueField: "_ref",
          title: "Причал"
        },
        {
          field: "tickets",
          valuePrimitive: false,
          dataSource: {
            transport: {
              read:  {
                url: `https://39dycnz5.api.sanity.io/v1/data/query/develop?query=*[_id==%22${ serviceID }%22]{%22directions%22:directions[]{title,%22tickets%22:tickets[]{...,category-%3E}}}`,
                dataType: "json"
              }
            },
            schema: {
              data: function (response) {
                const {
                  result: [
                    { directions = [] }
                  ]
                } = response;
                
                let tickets = [];
                directions.forEach(({title, tickets: _tickets = []}) => {
                  _tickets.forEach(ticket => {
                    tickets.push({
                      ...ticket,
                      text: `${ticket.category.title} ${ticket.name} за ${ticket.price} ₽ (${title})`
                    })
                  });
                });
                
                return tickets;
              },
            }
          },
          dataValueField: "_key",
          multiple: true,
          title: "Билеты"
        }
        */
      ],
      edit: (e) => {
        const kendoDropDownList = $('input[title="Recurrence editor"]').data('kendoDropDownList');
        kendoDropDownList.bind('change', (event) => {
          $('.k-recur-end-never').prop('disabled', true).parent().hide();
          $('.k-recur-end-count').prop('checked', true).parent().click();
        });

        if (e.event.isNew) {
          e.event.set("isAllDay", false);
          e.event.set('_key', nanoid());
          e.event.set('startTimezone', 'Europe/Moscow');
          e.event.set('endTimezone', 'Europe/Moscow');


          const start = e.container.find("[name=start][data-role=datetimepicker]");
          const end = e.container.find("[name=end][data-role=datetimepicker]");
          const startTime = new Date(e.event.start);
          const endTime = new Date(startTime);
          endTime.setHours(startTime.getHours() + 1);
          $(start).data("kendoDateTimePicker").value(startTime);
          $(end).data("kendoDateTimePicker").value(endTime);
          e.event.end = endTime;

          $(start).on('change', function () {
            const newStart = $(start).data("kendoDateTimePicker").value();
            const newEnd = $(end).data("kendoDateTimePicker").value();

            if (newStart <= newEnd) {
              newEnd.setHours(newStart.getHours() + 1);
              $(end).data("kendoDateTimePicker").value(newEnd);
              e.event.end = newEnd;
            }
          });

          // Rrule
          kendoDropDownList = $('input[title="Recurrence editor"]').data('kendoDropDownList');
          kendoDropDownList.bind('change', (event) => {
            switch (event.sender.value()) {
              case 'daily':
                e.event.recurrenceRule = `FREQ=DAILY;COUNT=1`;
                break;
              case 'weekly':
                e.event.recurrenceRule = `FREQ=WEEKLY;COUNT=1;BYDAY=MO`;
                break;
              case 'monthly':
                e.event.recurrenceRule = `FREQ=MONTHLY;COUNT=1;BYMONTHDAY=${e.event.start.getDay() + 1}`;
                break;
              case 'yearly':
                e.event.recurrenceRule = `FREQ=YEARLY;COUNT=1;BYMONTH=${e.event.start.getMonth() + 1};BYMONTHDAY=${e.event.start.getDay() + 1}`;
                break;
            }
          });
        }
      },
      dataBound: (e) => {
        const data = e.sender.dataSource.data();
        setEvents([...data]);
      }
    });

    return () => {
      const $calendar = $elmt.data("kendoScheduler");
      $calendar.destroy();
    }
  }, []);

  return (
    <>
      <details>
        <summary>В календаре {events.length || 'нет'} {getNoun(events.length, 'событие', 'события', 'событий')}</summary>
        <pre><code>{JSON.stringify(events, null, 2)}</code></pre>
      </details>
      <button
        type="button"
        onClick={() => { setEvents([]) }}
      >
        Очистить
      </button>
      <div className="schedule" ref={ref} />
    </>
  );
};

export default Schedule;