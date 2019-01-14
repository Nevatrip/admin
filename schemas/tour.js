import FaExchange from 'react-icons/lib/fa/exchange'

export default {
  name: 'tour',
  title: 'Экскурсия',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
      type: 'string',
      required: true,
    },
    {
      name: 'titleLong',
      title: 'Расширенный заголовок',
      type: 'string',
      required: true,
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Категория',
      to: { type: 'settingServiceCategory' },
    },
    {
      name: 'key',
      title: 'Ключ',
      type: 'slug',
      required: true,
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'directions',
      title: 'Направления',
      type: 'array',
      options: {
        editModal: 'fullscreen',
      },
      of: [
        { type: 'direction' },
        {
          name: 'complex',
          title: '«Составная» экскурсия',
          icon: FaExchange,
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Название',
              type: 'string'
            },
            {
              name: 'nested',
              title: 'Одиночные направления',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  title: 'Выбрать одиночное направление',
                  to: { type: 'direction' },
                }
              ]
            }
          ]
        },
      ],
      // inputComponent: Direction
    },
    {
      name: 'features',
      title: 'Пункты',
      type: 'text'
    },
    {
      name: 'descriptionPrepend',
      title: 'Дополнительная информация перед описанием',
      type: 'text'
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text'
    },
    {
      name: 'descriptionAppend',
      title: 'Дополнительная информация после описания',
      type: 'text'
    },
    {
      name: 'advice',
      title: 'Совет от организатора',
      type: 'text'
    },
    {
      name: 'point',
      type: 'reference',
      title: 'Причал',
      to: { type: 'point' },
    },
    {
      name: 'priceDescription',
      title: 'Текст с призывом перед последней ценой на странице экскурсии',
      type: 'string'
    },
    {
      name: 'price',
      title: 'Стоимость по умолчанию',
      type: 'string'
    },
    {
      name: 'priceOld',
      title: 'Стоимость на причале',
      type: 'string'
    },
    {
      name: 'sale',
      title: 'Скидки',
      type: 'string'
    },
    {
      name: 'routeMap',
      title: 'Ссылка на карту маршрута',
      type: 'url'
    },
    {
      title: 'Язык экскурсии',
      name: 'language',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: 'русский', value: 'ru' },
          { title: 'английский', value: 'en' },
        ]
      }
    },
    {
      title: 'Достопримечательности',
      name: 'attractions',
      type: 'array',
      of: [
        { type: 'reference', to: { type: 'point' } },
      ],
    },
    {
      title: 'Окончание навигации',
      name: 'end',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Сегодня'
      }
    },
    {
      name: 'place',
      type: 'reference',
      title: 'Транспортное средство',
      to: { type: 'place' },
    },
    {
      title: 'Что есть на борту',
      name: 'placeFeatures',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: 'туалет', value: 'male' },
          { title: 'бар', value: 'glass' },
          { title: 'еда', value: 'cutlery' },
          { title: 'экскурсия', value: 'comment' },
          { title: 'музыка', value: 'music' },
        ]
      }
    },
    {
      name: 'ticketPrint',
      type: 'reference',
      title: 'Печатать билет',
      to: { type: 'settingTicketPrint' },
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
      name: 'partnerContract',
      title: '№ договора с оператором',
      type: 'string'
    },
    {
      name: 'duration',
      title: 'Длительность',
      type: 'string'
    },
    {
      name: 'schedule',
      title: 'Расписание',
      type: 'string'
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  }
}
