export default {
  name: 'action',
  title: 'Одиночное событие',
  type: 'document',
  fields: [
    {
      name: 'event',
      type: 'reference',
      to: [{type: 'event'}]
    },
    {
      name: 'start',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        timeStep: 5,
        calendarTodayLabel: 'Сегодня'
      },
    },
  ],
  preview: {
    select: { start: 'start' },
    prepare({ start }) {
      return {
        title: new Date(start).toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })
      }
    }
  }
}