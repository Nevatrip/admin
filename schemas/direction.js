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
      type: 'localeString',
      description: 'Название используется в билете, должно быть заполнено на всех продаваемых языках'
    },
    {
      name: 'partner',
      type: 'reference',
      title: 'Партнёр/оператор',
      to: { type: 'apiProvider' },
    },
    {
      name: 'partnerName',
      title: 'Название экскурсии для оператора',
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
      name: 'buyTimeOffset',
      type: 'number',
      title: 'За сколько минут до рейса прекратить продажу',
    },
    {
      name: 'ticketInfo',
      title: 'Инфо в билете',
      type: 'localeText',
      description: 'Инфо в билете рядом с восклицательным знаком'
    },
    {
      name: 'schedule',
      title: 'Расписание',
      type: 'schedule',
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare( selection ) {
      const { title } = selection;
      
      return {
        title: title.ru
      }
    },
  },
}
