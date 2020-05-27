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

import '../../node_modules/@progress/kendo-ui/css/web/kendo.common-material.min.css?raw';
import '../../node_modules/@progress/kendo-ui/css/web/kendo.material.min.css?raw';

import './Schedule.css';

const createPatchEvent = value => PatchEvent.from(set(value));

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
};
const createAction = (event) => ({
  _key: nanoid(),
  start: event.start.toISOString(),
});
const createOrEditEvent = ({ success, data: { models: [ event ] } }) => {
  console.log( `--event`, event );
  if (event.recurrenceRule) {
    const rruleSet = new RRuleSet();
    const options = RRule.parseString(event.recurrenceRule);
    options.dtstart = new Date(event.start);
    rruleSet.rrule(new RRule(options));
    if (event.recurrenceException) {
      event.recurrenceException
        .split(',')
        .forEach(date => rruleSet.exdate(dateutil.untilStringToDate(date)));
    }
    event.actions = rruleSet.all().map((start) => createAction(Object.assign(Object.assign({}, event), { start })));
  }
  else {
    event.actions = [createAction(event)];
  }
  success(event);
};

const Schedule = ({ onChange, value = [] }) => {
  console.log( `value`, value );
  const [events, setEvents] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    console.log( `useEffect init`, events );
    let $scheduler;
    if (ref.current) {
      $scheduler = $(ref.current);
      const kendo = window.kendo;
      kendo.culture('ru-RU');
      $scheduler.kendoScheduler({
        toolbar: [{ name: "pdf" }],
        // height: 900,
        allDaySlot: false,
        timeZone: 'Europe/Prague',
        editable: {
          // template: kendo.template(`<div>Hello</div>`)
        },
        views: [
          { type: 'day' },
          { type: 'week' },
          {
            type: 'month',
            selected: true,
            eventTemplate: kendo.template("<b>#= kendo.toString(start, 'HH:mm') #</b> #: title #"),
            eventsPerDay: 4,
            adaptiveSlotHeight: false,
            eventSpacing: 1
          },
          { type: 'agenda' },
          { type: "timeline", eventHeight: 50 }
        ],
        messages: {
          pdf: " Распечатать",
          editor: {
            allDayEvent: "Расписание из API"
          },
          recurrenceEditor: {
            end: {
              occurrence: " повторения",
            },
          },
        },
        dataSource: {
          batch: true,
          transport: {
            read: ({ success }) => {
              console.log( `success(events)`, events );
              success(events);
            },
            update: createOrEditEvent,
            create: createOrEditEvent,
            destroy: ( { success, data: { models: [ event ] } } ) => {
              success(event);
            },
          },
          schema: {
            model: {
              id: '_key',
              fields: {
                _key: { from: '_key', type: 'string', defaultValue: nanoid() },
                _type: { from: '_type', type: 'string', defaultValue: 'event' },
                title: { from: 'title', type: 'string' },
                start: { from: 'start', type: 'date', },
                end: { from: 'end', type: 'date', },
                startTimezone: { from: 'startTimezone', type: 'string' },
                endTimezone: { from: 'endTimezone', type: 'string' },
                description: { from: 'description', type: 'string' },
                recurrenceId: { from: 'recurrenceID', type: 'string' },
                recurrenceRule: { from: 'recurrenceRule', type: 'string' },
                recurrenceException: { from: 'recurrenceException', type: 'string' },
                isAllDay: { from: 'isAllDay', type: 'boolean', defaultValue: false },
                openTime: { from: 'openTime', type: 'boolean', defaultValue: false },
                point: { from: 'point', type: 'object' },
                tickets: { from: 'tickets', type: 'array' },
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
          {
            field: "point",
            valuePrimitive: false,
            dataSource: {
              transport: { read: { url: "https://u8w084c0.api.sanity.io/v1/data/query/production?query=*[_type==%22point%22]{%22_ref%22:_id,%22text%22:title.ru}" } },
              schema: {
                data: (response) => response.result,
              }
            },
            dataValueField: "_ref",
            title: "Причал"
          },
        ],
        add: e => {
          /*
          e.event.isAllDay = false;
          e.event.startTimezone = e.event.startTimezone || 'Europe/Prague';
          e.event.start.getHours() === 0 && e.event.start.setHours(17);
          e.event.end.getHours() === 0 && e.event.end.setHours(18);
          */
        },
        edit: e => {
          /*
          if (!e.container || !e.event) return;
          const $startField = e.container.find("[name=start][data-role=datetimepicker]");
          const startField = $($startField).data("kendoDateTimePicker");
          const $endField = e.container.find("[name=end][data-role=datetimepicker]");
          const endField = $($endField).data("kendoDateTimePicker");
          const { start, end, } = e.event;

          startField.bind('change', function (event) {
            var _a;
            const newStart = event.sender.value();
            if (newStart >= end) {
              end.setHours(newStart.getHours() + 1);
              (_a = e.event) === null || _a === void 0 ? void 0 : _a.set('end', end);
              endField.value(end);
            }
          });

          const kendoDropDownList = $('input[title="Recurrence editor"]').data('kendoDropDownList');
          $('.k-recur-end-never').prop('disabled', true).parent().hide();
          kendoDropDownList === null || kendoDropDownList === void 0 ? void 0 : kendoDropDownList.bind('change', (event) => {
            $('.k-recur-end-never').prop('disabled', true).parent().hide();
            $('.k-recur-end-count').prop('checked', true).parent().click();
            
            if (!e.event) return;
            
            const byMonthDay = start.getDay() + 1;
            const byMonth = start.getMonth() + 1;
            switch (event.sender.value()) {
              case 'daily':
              e.event.recurrenceRule = `FREQ=DAILY;COUNT=1`;
              break;
              case 'weekly':
              e.event.recurrenceRule = `FREQ=WEEKLY;COUNT=1;BYDAY=MO`;
              break;
              case 'monthly':
              e.event.recurrenceRule = `FREQ=MONTHLY;COUNT=1;BYMONTHDAY=${byMonthDay}`;
              break;
              case 'yearly':
              e.event.recurrenceRule = `FREQ=YEARLY;COUNT=1;BYMONTH=${byMonth};BYMONTHDAY=${byMonthDay}`;
              break;
            }
          });
          */
        },
        dataBound: function () {
          const data = this.dataSource.data();
          console.log( `dataBound`, data );
          const newEvents = JSON.parse(
            JSON.stringify(
              data,
              (key, value) => key === 'uid' || value === '' ? undefined : value
            ),
          );
          console.log( `newEvents`, newEvents );
          setEvents(newEvents);
        }
      });
    }
    return () => {
      if ($scheduler) {
        const $calendar = $scheduler.data('kendoScheduler');
        $calendar && $calendar.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    console.log( `useEffect events`, events );
    let $scheduler;
    if (ref.current) {
      $scheduler = $(ref.current);
      const $calendar = $scheduler.data('kendoScheduler');
      $calendar && $calendar.dataSource.data(events);
    }
    
    onChange(createPatchEvent(events));
    
    return () => {
      if ($scheduler) {
        const $calendar = $scheduler.data('kendoScheduler');
        $calendar && $calendar.destroy();
      }
    };
  }, [events] )
  
  return (
    <>
      <div className="schedule" ref={ref}/>
      <details>
        <summary>В календаре {events.length || 'нет'} {getNoun(events.length, 'событие', 'события', 'событий')}</summary>
        <button type="button" 
          // eslint-disable-next-line no-restricted-globals
          onClick={() => { confirm('Удалить ВСЕ события?') && setEvents([]); }}
        >Очистить</button>
        <pre>
          <code>
            { JSON.stringify(events, null, 2) }
          </code>
        </pre>
      </details>
    </>
  );
};
  
export default Schedule;