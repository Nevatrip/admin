import React from 'react';
import uuid from '@sanity/uuid';
import { PatchEvent, set, unset, setIfMissing } from 'part:@sanity/form-builder/patch-event'
import {FormBuilderInput} from 'part:@sanity/form-builder'
import Schema from '@sanity/schema'
import Button from 'part:@sanity/components/buttons/default'
import DefaultDialog from 'part:@sanity/components/dialogs/default'
import DialogContent from 'part:@sanity/components/dialogs/content'
import FullscreenDialog from 'part:@sanity/components/dialogs/fullscreen'

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

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);

    this.state = {
      events: this.props.value || [],
      modalIsOpen: false,
      event: {}
    };
  }
  
  calendarComponentRef = React.createRef();
  
  handleFieldChange = (field, fieldPatchEvent) => {
    const { onChange, type, value = [] } = this.props;
    const { event, events } = this.state;
    const [ { value: _value } ] = fieldPatchEvent.patches;
    
    const newValue = {};
    newValue[field.name] = _value;
    
    const _event = {
      ...event,
      ...newValue,
    }
    
    const _events = [...events];
    _events[_events.length - 1] = _event;
    
    this.setState({
      event: _event,
      events: _events,
    }, onChange(createPatchEvent(_events)));
  }
  
  handleCloseModal() {
    this.setState({modalIsOpen: false});
  }
  
  handleOpenModal(events) {
    const event = events[ events.length - 1 ];

    this.setState({
      modalIsOpen: true,
      events,
      event,
    })
  }
  
  handleToggleModal() {
    this.setState(prevState => ({modalIsOpen: !prevState.modalIsOpen}))
  }

  render() {
    const { onChange, type, value, level, focusPath, onFocus, onBlur } = this.props;
    const [ { fields } ] = type.of;
    const { events, modalIsOpen, event } = this.state;
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
      <>
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
          editable={true}
          eventLimit={true}
          eventClick={({event}) => console.log( 'event', event, event.title, event.start, event.end )}
        />
        
        <FullscreenDialog
          title="Добавить новое событие"
          onClose={this.handleCloseModal}
          onCloseClick={this.handleCloseModal}
          showCloseButton={true}
          onEscape={this.handleCloseModal}
          // actions
          // onOpen={this.handleOpenModal}
          isOpen={modalIsOpen}
        >
          <DialogContent size="small" padding="small">
            {
              fields.map((field, i) => (
                <div key={field.name}>
                  <FormBuilderInput
                    level={level + 1}
                    ref={i === 0 ? this.firstFieldInput : null}
                    key={field.name}
                    type={field.type}
                    value={event && event[field.name]}
                    onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
                    path={[field.name]}
                    focusPath={focusPath}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
              ))
            }
            <Button onClick={this.handleCloseModal}>Сохранить</Button>
          </DialogContent>
        </FullscreenDialog>
      </>
    )
  }
  
  handleDateClick = (arg) => {
    console.log( 'events', events );
    const { events = [] } = this.state;
    const start = new Date(arg.date);
    const end = new Date(arg.date);
    end.setHours(end.getHours() + 1, 30);
    
    const newState = [
      ...events,
      {
        _key: uuid(),
        _type: 'event',
        start: start.toISOString(),
        end: end.toISOString(),
        title: '',
        allDay: false,
        editable: true,
      }
    ];
    
    this.handleOpenModal( newState );
  }
}
