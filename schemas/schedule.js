import Schedule from '../components/Schedule'

export default {
  name: 'schedule',
  title: 'Расписание',
  type: 'array',
  of: [
    {
      name: 'event',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Название',
          type: 'string',
          required: true,
          validation: Rule => Rule.required(),
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
          validation: Rule => Rule.required(),
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
          validation: Rule => Rule.required(),
        },
        {
          name: 'recurrenceId',
          title: 'recurrenceId',
          type: 'string',
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
        },
        {
          name: 'actions',
          title: 'actions',
          type: 'array',
          of: [
            {
              name: 'action',
              type: 'object',
              fields: [
                {
                  name: 'start',
                  type: 'datetime',
                  options: {
                    dateFormat: 'DD.MM.YYYY',
                    timeFormat: 'HH:mm',
                    timeStep: 15,
                    calendarTodayLabel: 'Сегодня'
                  },
                  required: true,
                  validation: Rule => Rule.required(),
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  },
  inputComponent: Schedule
}
