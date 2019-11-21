import React from 'react';
import uuid from '@sanity/uuid';
import { PatchEvent, set, unset, setIfMissing } from 'part:@sanity/form-builder/patch-event'
import {FormBuilderInput} from 'part:@sanity/form-builder'
import Button from 'part:@sanity/components/buttons/default'
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
    
    this.calendarComponentRef = React.createRef();

    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

    this.state = {
      events: this.props.value || [],
      modalIsOpen: false,
      event: {}
    };
  }

  handleFieldChange = (field, fieldPatchEvent) => {
    const { event } = this.state;
    const [ { value } ] = fieldPatchEvent.patches;
    
    const _event = {};
    _event[field.name] = value;
    
    if (field.name === 'start' && value >= event.end) {
      const end = new Date(value);
      end.setHours(end.getHours() + 1, 30);
      _event.end = end;
    }
    // if (field.name === 'start') _event.rrule.dtstart = value;
    _event.actions = event.actions || []
    if (field.name === 'start') _event.actions[0] = {
      _key: uuid(),
      start: value
    };
    
    this.setState({ event: {
      ...event,
      ..._event,
    } });
  }
  
  saveEvent = () => {
    const { event = {} } = this.state;
    
    if (event._isNewEvent) {
      this.addEvent();
    } else {
      this.updateEvent();
    }
    
    this.closeModal();
  }
  
  addEvent = () => {
    console.log( 'addEvent' );
    const { onChange } = this.props;
    const { event = {}, events = [] } = this.state;
    const _events = [
      ...events,
      event,
    ];
    this.setState({
      event: {},
      events: _events,
    }, onChange(createPatchEvent(_events)));
  }
  
  updateEvent = () => {
    console.log( 'updateEvent' );
    const { onChange } = this.props;
    const { event = {} } = this.state;
    const _event = this.calendarComponentRef.current.getApi().getEventById(event._key);
    Object.keys(event).forEach(key => {
      switch (key) {
        case 'start'  : _event.setStart(event[key]); break;
        case 'end'    : _event.setEnd(event[key]); break;
        case 'allDay' : _event.setAllDay(event[key]); break;
        case 'title'  :
        case 'rrule'  : _event.setProp(key, event[key]); break;
        default       : _event.setExtendedProp(key, event[key]); break;
      }
    });
    
    const _events = this.calendarComponentRef.current.getApi().getEvents()
      .map(({ id, start, end, title, allDay = false, groupId, /* url, */ extendedProps: { _key, _type, point, actions } }) => ({
        _key,
        _type,
        id,
        start: start.toISOString(),
        end: end.toISOString(),
        title,
        allDay,
        groupId,
        // url,
        point,
        actions,
      }));
    
    this.setState({
      event: {},
      events: _events,
    }, onChange(createPatchEvent(_events)));
  }
  
  removeEvent = event => {}
  
  closeModal() { this.setState({modalIsOpen: false}) }

  dateClick = (arg) => {
    const start = new Date(arg.date);
    start.setHours(10);
    const end = new Date(arg.date);
    end.setHours(start.getHours() + 1, 30);

    this.openModal({ start, end, _isNewEvent: true });
  }
  
  eventClick = ({ event }) => {
    const _event = {
      ...event.extendedProps,
      _isNewEvent: false,
      id: event.id,
      start: event.start,
      end: event.end,
      title: event.title,
      allDay: event.allDay,
      // url: event.url,
      groupId: event.groupId,
    }
    
    this.openModal(_event);
  }

  openModal(event) {
    console.log( 'event', event );
    const _uuid = uuid();
    const _event = {
      _key: event._key || _uuid,
      _type: event._type || 'event',
      _isNewEvent: event._isNewEvent || false,
      id: event._key || _uuid,
      start: new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
      title: event.title,
      point: event.point,
      actions: event.actions || [{
        _key: uuid(),
        start: new Date(event.start).toISOString(),
      } ],
    }
    
    this.setState({
      modalIsOpen: true,
      event: _event,
    })
  }
  
  toggleModal() { this.setState(prevState => ({modalIsOpen: !prevState.modalIsOpen})) }
  
  render() {
    const { onChange, type, level, focusPath, onFocus, onBlur, value } = this.props;
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
          onClick={() => {
            this.setState({ events: [] });
            onChange(createPatchEvent([]));
            this.calendarComponentRef.current.getApi().rerenderEvents();
          }}
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
          locale={ ruLocale }
          timeZone='Europe/Moscow'
          eventLimit={true}
          dateClick={ this.dateClick }
          eventClick={ this.eventClick }
          eventDrop={ this.openModal }
        />
        
        <FullscreenDialog
          title={ event._isNewEvent ? 'Добавить новое событие' : 'Редактировать событие' }
          onClose={this.closeModal}
          onCloseClick={this.closeModal}
          showCloseButton={true}
          onEscape={this.closeModal}
          // actions
          // onOpen={this.openModal}
          isOpen={modalIsOpen}
        >
          <DialogContent size="auto" padding="small">
            <div style={{ columns: 2 }}>
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
            </div>
            <Button onClick={this.saveEvent}>Сохранить</Button>
          </DialogContent>
        </FullscreenDialog>
      </>
    )
  }
}
