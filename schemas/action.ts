import { defineObject } from 'sanity-typed-queries'
import { point } from './point'

const { action, object } = defineObject( 'action', {
  tour: {
    type: 'string',
    // hidden: true,
  },
  direction: {
    type: 'string',
    // hidden: true,
  },
  event: {
    type: 'string',
    // hidden: true,
  },
  start: {
    title: 'start',
    type: 'datetime',
    options: {
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      timeStep: 5,
      calendarTodayLabel: 'Сегодня'
    },
  },
  end: {
    title: 'end',
    type: 'datetime',
    options: {
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      timeStep: 5,
      calendarTodayLabel: 'Сегодня'
    },
  },
  timeZone: {
    title: 'Часовой пояс',
    type: 'string',
    options: {
      list: [
        { title: 'Москва / Санкт-Петербург', value: 'Europe/Moscow' },
        { title: 'Прага', value: 'Europe/Prague' },
      ]
    }
  },
  allDay: {
    title: 'allDay',
    type: 'boolean',
  },
  point: {
    type: 'reference',
    title: 'Причал',
    to: [ { type: 'point' } ],
  },
  rrule: {
    title: 'Повторять событие…',
    type: 'object',
    options: {
      collapsible: true,
      collapsed: true,
    },
    fields: [
      {
        name: 'freq',
        title: 'Повторять',
        type: 'string',
        options: {
          list: [
            { title: 'Еженедельно', value: 'weekly' },
            { title: 'Ежедневно', value: 'daily' },
          ],
          layout: 'radio'
        },
      },
      {
        name: 'interval',
        title: 'interval',
        type: 'number',
      },
      {
        name: 'count',
        title: 'count',
        type: 'number',
      },
      {
        name: 'until',
        title: 'until',
        type: 'datetime',
        options: {
          dateFormat: 'DD.MM.YYYY',
          timeFormat: 'HH:mm',
          timeStep: 5,
          calendarTodayLabel: 'Сегодня'
        },
      },
      {
        name: 'byweekday',
        title: 'По дням недели',
        type: 'array',
        of: [ { type: 'string' } ],
        options: {
          list: [
            { title: 'Пн', value: 'mo' },
            { title: 'Вт', value: 'tu' },
            { title: 'Ср', value: 'we' },
            { title: 'Чт', value: 'th' },
            { title: 'Пт', value: 'fr' },
            { title: 'Сб', value: 'sa' },
            { title: 'Вс', value: 'su' },
          ]
        }
      },
    ]
  },
}, [
  point,
] )

object.title = 'Одиночное событие'
object.preview = {
  select: { start: 'start' },
  prepare( { start } ) {
    return {
      title: new Date( start ).toLocaleString( 'ru', { year: 'numeric', month: 'long', day: 'numeric' } )
    }
  }
}

export { action }
export default object