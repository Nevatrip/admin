import Schedule from '../components/Schedule/Schedule'

export default {
  name: 'schedule',
  title: 'Расписание',
  type: 'array',
  of: [
    {
      name: 'event',
      type: 'object',
      title: 'Событие',
      fields: [
        {
          name: 'start',
          title: 'start',
          type: 'datetime',
          options: {
            dateFormat: 'DD.MM.YYYY',
            timeFormat: 'HH:mm',
            timeStep: 5,
            calendarTodayLabel: 'Сегодня'
          },
          required: true,
          validation: Rule => Rule.required(),
        },
        {
          name: 'end',
          title: 'end',
          type: 'datetime',
          options: {
            dateFormat: 'DD.MM.YYYY',
            timeFormat: 'HH:mm',
            timeStep: 5,
            calendarTodayLabel: 'Сегодня'
          },
          required: true,
          validation: Rule => Rule.required(),
        },
        {
          name: 'title',
          title: 'title',
          type: 'string',
          required: true,
          validation: Rule => Rule.required(),
        },
        {
          name: 'allDay',
          title: 'allDay',
          type: 'boolean',
        },
        {
          name: 'groupId',
          title: 'groupId',
          type: 'string',
        },
        {
          name: 'url',
          title: 'url',
          type: 'url',
        },
        {
          name: 'editable',
          title: 'editable',
          type: 'boolean',
          hidden: true,
          readOnly: true,
        },
        {
          name: 'point',
          type: 'reference',
          title: 'Причал',
          to: { type: 'point' },
        },
        {
          name: 'rrule',
          title: 'rrule',
          type: 'object',
          fields: [
            {
              name: 'freq',
              title: 'freq',
              type: 'string',
              description: '(required) One of the following constants: RRule.YEARLY, RRule.MONTHLY, RRule.WEEKLY, RRule.DAILY, RRule.HOURLY, RRule.MINUTELY, RRule.SECONDLY'
            },
            {
              name: 'dtstart',
              title: 'dtstart',
              type: 'datetime',
              description: 'The recurrence start. Besides being the base for the recurrence, missing parameters in the final recurrence instances will also be extracted from this date. If not given, new Date will be used instead.'
            },
            {
              name: 'interval',
              title: 'interval',
              type: 'number',
              description: 'The interval between each freq iteration. For example, when using RRule.YEARLY, an interval of 2 means once every two years, but with RRule.HOURLY, it means once every two hours. The default interval is 1.'
            },
            {
              name: 'wkst',
              title: 'wkst',
              type: 'string',
              description: 'The week start day. Must be one of the RRule.MO, RRule.TU, RRule.WE constants, or an integer, specifying the first day of the week. This will affect recurrences based on weekly periods. The default week start is RRule.MO.',
            },
            {
              name: 'count',
              title: 'count',
              type: 'number',
              description: 'How many occurrences will be generated.',
            },
            {
              name: 'until',
              title: 'until',
              type: 'datetime',
              description: 'If given, this must be a Date instance, that will specify the limit of the recurrence. If a recurrence instance happens to be the same as the Date instance given in the until argument, this will be the last occurrence.',
            },
            {
              name: 'tzid',
              title: 'tzid',
              type: 'string',
              description: 'If given, this must be a string supported by Luxon, and the Luxon library must be provided. See discussion under Timezone support.',
            },
            {
              name: 'bysetpos',
              title: 'bysetpos',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, positive or negative. Each given integer will specify an occurrence number, corresponding to the nth occurrence of the rule inside the frequency period. For example, a bysetpos of -1 if combined with a RRule.MONTHLY frequency, and a byweekday of (RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR), will result in the last work day of every month.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'bymonth',
              title: 'bymonth',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, meaning the months to apply the recurrence to.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'bymonthday',
              title: 'bymonthday',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, meaning the month days to apply the recurrence to.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'byyearday',
              title: 'byyearday',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, meaning the year days to apply the recurrence to.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'byweekno',
              title: 'byweekno',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, meaning the week numbers to apply the recurrence to. Week numbers have the meaning described in ISO8601, that is, the first week of the year is that containing at least four days of the new year.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'byweekday',
              title: 'byweekday',
              type: 'array',
              description: 'If given, it must be either an integer (0 == RRule.MO), an array of integers, one of the weekday constants (RRule.MO, RRule.TU, etc), or an array of these constants. When given, these variables will define the weekdays where the recurrence will be applied. It\'s also possible to use an argument n for the weekday instances, which will mean the nth occurrence of this weekday in the period. For example, with RRule.MONTHLY, or with RRule.YEARLY and BYMONTH, using RRule.FR.nth(+1) or RRule.FR.nth(-1) in byweekday will specify the first or last friday of the month where the recurrence happens. Notice that the RFC documentation, this is specified as BYDAY, but was renamed to avoid the ambiguity of that argument.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'byhour',
              title: 'byhour',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, meaning the hours to apply the recurrence to.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'byminute',
              title: 'byminute',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, meaning the minutes to apply the recurrence to.',
              of: [
                { type: 'number' }
              ],
            },
            {
              name: 'bysecond',
              title: 'bysecond',
              type: 'array',
              description: 'If given, it must be either an integer, or an array of integers, meaning the seconds to apply the recurrence to.',
              of: [
                { type: 'number' }
              ],
            },
          ]
        },
        {
          name: 'actions',
          title: 'actions',
          type: 'array',
          hidden: true,
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
                    timeStep: 5,
                    calendarTodayLabel: 'Сегодня'
                  },
                  required: true,
                  validation: Rule => Rule.required(),
                }
              ]
            }
          ]
        },
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
    }
  },
  inputComponent: Schedule
}
