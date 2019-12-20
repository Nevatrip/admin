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
          name: 'title',
          title: 'title',
          type: 'string',
          hidden: true,
        },
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
        },
        {
          name: 'timeZone',
          title: 'Часовой пояс',
          type: 'string',
          options: {
            list: [
              { title: 'Москва / Санкт-Петербург', value: 'Europe/Moscow' },
              { title: 'Прага', value: 'Europe/Prague' },
            ]
          }
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
        },
        {
          name: 'allDay',
          title: 'allDay',
          type: 'boolean',
        },
        {
          name: 'point',
          type: 'reference',
          title: 'Причал',
          to: { type: 'point' },
        },
        {
          name: 'rrule',
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
                  // { title: 'Ежегодно', value: 'YEARLY' },
                  // { title: 'Ежемесячно', value: 'MONTHLY' },
                  { title: 'Еженедельно', value: 'weekly' },
                  { title: 'Ежедневно', value: 'daily' },
                  // { title: 'Ежечасно', value: 'HOURLY' },
                  // { title: 'Ежеминутно', value: 'MINUTELY' },
                  // { title: 'Ежесекундно', value: 'SECONDLY' },
                ],
                layout: 'radio'
              },
            },
            {
              name: 'dtstart',
              title: 'dtstart',
              type: 'datetime',
              hidden: true,
              readOnly: true,
              options: {
                dateFormat: 'DD.MM.YYYY',
                timeFormat: 'HH:mm',
                timeStep: 5,
                calendarTodayLabel: 'Сегодня'
              },
              // description: 'The recurrence start. Besides being the base for the recurrence, missing parameters in the final recurrence instances will also be extracted from this date. If not given, new Date will be used instead.'
            },
            {
              name: 'interval',
              title: 'interval',
              type: 'number',
              // description: 'The interval between each freq iteration. For example, when using RRule.YEARLY, an interval of 2 means once every two years, but with RRule.HOURLY, it means once every two hours. The default interval is 1.'
            },
            // {
            //   name: 'wkst',
            //   title: 'wkst',
            //   type: 'string',
            //   description: 'The week start day. Must be one of the RRule.MO, RRule.TU, RRule.WE constants, or an integer, specifying the first day of the week. This will affect recurrences based on weekly periods. The default week start is RRule.MO.',
            // },
            {
              name: 'count',
              title: 'count',
              type: 'number',
              // description: 'How many occurrences will be generated.',
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
              // description: 'If given, this must be a Date instance, that will specify the limit of the recurrence. If a recurrence instance happens to be the same as the Date instance given in the until argument, this will be the last occurrence.',
            },
            // {
            //   name: 'tzid',
            //   title: 'tzid',
            //   type: 'string',
            //   description: 'If given, this must be a string supported by Luxon, and the Luxon library must be provided. See discussion under Timezone support.',
            // },
            // {
            //   name: 'bysetpos',
            //   title: 'bysetpos',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, positive or negative. Each given integer will specify an occurrence number, corresponding to the nth occurrence of the rule inside the frequency period. For example, a bysetpos of -1 if combined with a RRule.MONTHLY frequency, and a byweekday of (RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR), will result in the last work day of every month.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
            // {
            //   name: 'bymonth',
            //   title: 'bymonth',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, meaning the months to apply the recurrence to.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
            // {
            //   name: 'bymonthday',
            //   title: 'bymonthday',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, meaning the month days to apply the recurrence to.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
            // {
            //   name: 'byyearday',
            //   title: 'byyearday',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, meaning the year days to apply the recurrence to.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
            // {
            //   name: 'byweekno',
            //   title: 'byweekno',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, meaning the week numbers to apply the recurrence to. Week numbers have the meaning described in ISO8601, that is, the first week of the year is that containing at least four days of the new year.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
            {
              name: 'byweekday',
              title: 'По дням недели',
              type: 'array',
              // description: 'If given, it must be either an integer (0 == RRule.MO), an array of integers, one of the weekday constants (RRule.MO, RRule.TU, etc), or an array of these constants. When given, these variables will define the weekdays where the recurrence will be applied. It\'s also possible to use an argument n for the weekday instances, which will mean the nth occurrence of this weekday in the period. For example, with RRule.MONTHLY, or with RRule.YEARLY and BYMONTH, using RRule.FR.nth(+1) or RRule.FR.nth(-1) in byweekday will specify the first or last friday of the month where the recurrence happens. Notice that the RFC documentation, this is specified as BYDAY, but was renamed to avoid the ambiguity of that argument.',
              of: [{ type: 'number' }],
              options: {
                list: [
                  {title: 'Пн', value: 0 },
                  {title: 'Вт', value: 1 },
                  {title: 'Ср', value: 2 },
                  {title: 'Чт', value: 3 },
                  {title: 'Пт', value: 4 },
                  {title: 'Сб', value: 5 },
                  {title: 'Вс', value: 6 },
                ]
              }
            },
            // {
            //   name: 'byhour',
            //   title: 'byhour',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, meaning the hours to apply the recurrence to.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
            // {
            //   name: 'byminute',
            //   title: 'byminute',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, meaning the minutes to apply the recurrence to.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
            // {
            //   name: 'bysecond',
            //   title: 'bysecond',
            //   type: 'array',
            //   description: 'If given, it must be either an integer, or an array of integers, meaning the seconds to apply the recurrence to.',
            //   of: [
            //     { type: 'number' }
            //   ],
            // },
          ]
        },
        {
          name: 'actions',
          title: 'actions',
          type: 'array',
          // hidden: true,
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
                }
              ],
              preview: {
                select: {
                  start: 'start'
                },
                prepare({ start }) {
                  return {
                    title: new Date(start).toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })
                  }
                }
              }
            }
          ]
        },
      ],
      preview: {
        select: {
          title: 'title',
          start: 'start',
          timezone: 'timezone',
          allDay: 'allDay',
          rrule: 'rrule',
          point: 'point.title.ru',
          actions: 'actions',
        },
        prepare({ title = '', start, timezone = 'Europe/Moscow', allDay, point, rrule: { freq, interval = 1, until, byweekday = [] }, actions = [] }) {
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
              const weekDay = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
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
      },
    }
  ],
  // inputComponent: Schedule
}
