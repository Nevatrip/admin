import { defineObject } from 'sanity-typed-queries'
import { defaultLang } from '../src/langs'
import { point } from './point'
import { ticket } from './ticket'
import { action } from './action'

const { event, object } = defineObject( 'event', {
  uid: {
    type: 'string',
    title: 'uid',
    // hidden: true,
  },
  title: {
    type: 'string',
    title: 'title',
    // hidden: true,
  },
  start: {
    type: 'datetime',
    title: 'start',
    options: {
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      timeStep: 5,
      calendarTodayLabel: 'Сегодня'
    },
  },
  end: {
    type: 'datetime',
    title: 'end',
    options: {
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      timeStep: 5,
      calendarTodayLabel: 'Сегодня'
    },
  },
  startTimezone: {
    type: 'string',
    title: 'Часовой пояс начала',
    options: {
      list: [
        { title: 'Москва / Санкт-Петербург', value: 'Europe/Moscow' },
        { title: 'Прага', value: 'Europe/Prague' },
      ]
    }
  },
  endTimezone: {
    type: 'string',
    title: 'Часовой пояс окончания',
    options: {
      list: [
        { title: 'Москва / Санкт-Петербург', value: 'Europe/Moscow' },
        { title: 'Прага', value: 'Europe/Prague' },
      ]
    }
  },
  description: {
    type: 'text',
    title: 'Описание',
  },
  isAllDay: {
    type: 'boolean',
    title: 'isAllDay',
  },
  recurrenceId: {
    type: 'string',
  },
  recurrenceRule: { 
    type: 'string',
  },
  recurrenceException: { 
    type: 'string',
  },
  point: {
    type: 'reference',
    title: 'Причал',
    to: [ { type: 'point' } ],
  },
  tickets: {
    title: 'Билеты',
    type: 'array',
    of: [ { type: 'ticket' } ]
  },
  actions: {
    title: 'actions',
    type: 'array',
    hidden: true,
    of: [ { type: 'action' } ]
  },
}, [
  point,
  ticket,
  action,
] )

object.title = 'Событие'
object.preview = {
  select: {
    title: 'title',
    start: 'start',
    timezone: 'timezone',
    allDay: 'allDay',
    rrule: 'rrule',
    point: 'point.title.ru',
    actions: 'actions',
  },
  _prepare({ title = '', start, timezone = 'Europe/Moscow', allDay, point, rrule: { freq, interval = 1, until, byweekday = [] }, actions = [] }) {
    const declOfNum = (number, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }

    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: timezone,
      hour: 'numeric',
      minute: 'numeric'
    };
    const date = new Date(start).toLocaleString("ru", dateOptions);
    const untilDate = until ? new Date(until).toLocaleString("ru", dateOptions) : '';
    
    let freqString = ''
    switch (freq) {
      case 'daily':
        freqString = `${ interval > 1 ? `Через каждые ${ interval }` : 'Каждый' } ${ declOfNum( interval, ['день', 'дня', 'дней'] ) }`
        break;
    
      case 'weekly': {
        const weekDay = {
          mo: 'пн',
          tu: 'вт',
          we: 'ср',
          th: 'чт',
          fr: 'пт',
          sa: 'сб',
          su: 'вс',
        };
        const weekDayFormat = byweekday.map(number => weekDay[number]).join(', ');
        freqString = `${ interval > 1 ? `Через ${ declOfNum( interval, ['каждую','каждые','каждые'] ) } ${ interval } ${ declOfNum( interval, ['неделю','недели','недель'] ) }` : 'Еженедельно' } по ${ weekDayFormat }`
        break;
        
      }
    
      default:
        break;
    }
    
    const count = actions.length || 0;
    const countLabel = declOfNum(count, ['раз', 'раза', 'раз']);
    
    return {
      title: `${ allDay ? 'Открытое время' : '' } ${title} ${date} от «${ point.substring(0,19) }…»,`,
      subtitle: `${ freqString } (${ count } ${ countLabel }) ${ until ? `до ${ untilDate }` : '' }`,
    }
  }
}

export { event }
export default object