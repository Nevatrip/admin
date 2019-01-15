export default {
  name: 'event',
  title: 'Событие',
  type: 'document',
  fields: [
    {
      name: 'eventId',
      title: 'Экскурсия',
      type: 'reference',
      to: [{type: 'tour'}],
      required: true,
    },
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      required: true,
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'string',
      required: true,
    },
    {
      name: 'isAllDay',
      title: 'Событие на весь день',
      type: 'boolean',
    },
    {
      name: 'start',
      title: 'Дата и время начала',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Сегодня'
      },
      required: true,
    },
    {
      name: 'end',
      title: 'Дата и время окончания',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Сегодня'
      },
      required: true,
    },
    {
      name: 'recurrenceId',
      title: 'recurrenceId',
      type: 'reference',
      to: [{type: 'event'}]
    },
    {
      name: 'recurrenceRule',
      title: 'recurrenceRule',
      type: 'string',
    },
    {
      name: 'startTimezone',
      title: 'startTimezone',
      type: 'string',
    },
    {
      name: 'endTimezone',
      title: 'endTimezone',
      type: 'string',
    }
  ]
}
