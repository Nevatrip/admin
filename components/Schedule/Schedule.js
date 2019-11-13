import React from 'react';
import uuid from '@sanity/uuid';
import { PatchEvent, set, unset, insert, setIfMissing } from 'part:@sanity/form-builder/patch-event'
import {FOCUS_TERMINATOR} from '@sanity/util/paths'

import FullCalendar from '@fullcalendar/react'
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import rrulePlugin from '@fullcalendar/rrule'

import '../../node_modules/@fullcalendar/core/main.css?raw';
import '../../node_modules/@fullcalendar/daygrid/main.css?raw';
import '../../node_modules/@fullcalendar/timegrid/main.css?raw';
import './Schedule.css';

const createPatchEvent = value => PatchEvent.from(value === '' ? unset() : set(value))

function createProtoValue(type) {
  if (type.jsonType !== 'object') {
    throw new Error(
      `Invalid item type: "${type.type}". Default array input can only contain objects (for now)`
    )
  }
  const key = uuid();
  return type.name === 'object'
    ? {_key: key}
    : {
        _type: type.name,
        _key: key
      }
}

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    
    console.log( 'props', props );

    this.state = {
      events: this.props.value || [],
    };
  }
  
  handleAddBtnClick = () => {
    this.handleInsertItem(this.props.type.of[0])
  }
  
  insert = (itemValue, position, atIndex) => {
    const {onChange} = this.props
    onChange(PatchEvent.from(setIfMissing([]), insert([itemValue], position, [atIndex])))
  }
  
  handleFocusItem = (item) => {
    this.props.onFocus([{_key: item._key}, FOCUS_TERMINATOR])
  }
  
  handleAppend = (value) => {
    this.insert(value, 'after', -1);
    this.handleFocusItem(value);
  }

  handleInsertItem = type => {
    console.log( 'type', type );
    const onCreateValue = createProtoValue;
    const onAppendItem = this.handleAppend;
    const item = onCreateValue(type)
    onAppendItem(item)
  }
  
  calendarComponentRef = React.createRef()

  render() {
    const { onChange } = this.props;
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
        <details>
          <summary>В календаре {events.length || 'нет'} {getNoun(events.length, 'событие', 'события', 'событий')}</summary>
          <pre><code>{JSON.stringify(events, null, 2 )}</code></pre>
        </details>
        <button
          type="button"
          onClick={() => { this.setState({ events: {} }); onChange( createPatchEvent('') ) } }
        >
          Очистить
        </button>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin ]}
          ref={ this.calendarComponentRef }
          events={ events }
          dateClick={ this.handleDateClick }
          locale={ ruLocale }
          timeZone='Europe/Moscow'
          />
      </div>
    )
  }
  
  handleDateClick = (arg) => {
    const { onChange } = this.props;
    const { events = [] } = this.state;

    this.handleAddBtnClick()

    // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //   const start = new Date(arg.date);
    //   const end = new Date(arg.date);
    //   end.setHours(end.getHours() + 1, 30);
      
      
    //   const newState = [
    //     ...events,
    //     {
    //       _key: uuid(),
    //       _type: 'event',
    //       title: 'New Event ' + arg.dateStr,
    //       start: start.toISOString(),
    //       end: end.toISOString(),
    //       allDay: false,
    //     }
    //   ];
      
    //   this.setState({ events: newState }, onChange(createPatchEvent(newState)));
    // }
  }
}
