import FaLongArrowRight from 'react-icons/lib/fa/long-arrow-right'

export default {
  name: 'direction',
  title: 'Одиночное направление',
  icon: FaLongArrowRight,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string'
    },
    {
      name: 'map',
      title: 'Карта',
      type: 'string',
      description: 'Ссылка на яндекс или гугл-карту текущего маршрута'
    },
    {
      name: 'tickets',
      title: 'Билеты',
      type: 'array',
      of: [
        { type: 'ticket' }
      ]
    },
    {
      name: 'point',
      type: 'reference',
      title: 'Причал',
      to: { type: 'point' },
    },
    {
      name: 'schedule',
      title: 'Расписание',
      type: 'schedule',
    }
  ],
}
