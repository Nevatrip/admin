import FaExchange from 'react-icons/lib/fa/exchange'

export default {
  name: 'tour',
  title: 'Экскурсия',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'key',
      title: 'Ключ',
      type: 'slug',
      required: true,
      description: 'Для экскурсий со старого сайта должен совпадать с полем "Псевдоним"',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'titleLong',
      title: 'Расширенный заголовок',
      type: 'string',
      description: 'Развернутый заголовок для мета тегов',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'status',
      title: 'Статус',
      type: 'array',
      of: [ { type: 'string' } ],
      options: {
        list: [
          { title: 'Не показывать в списке категории', value: 'hidden' },
          { title: 'Снять с публикации', value: 'deleted' },
        ]
      }
    },
    {
      name: 'titleImage',
      title: 'Главное изображение',
      type: 'image',
      description: 'Настройка: "Edit", "Square": задать центр для превью экскурсии, по умолчанию это центр изображения',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Категория',
      to: { type: 'settingServiceCategory' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Теги',
      of: [
        {
          type: 'reference',
          title: 'Тег',
          to: { type: 'settingServiceTag' }
        }
      ],
      validation: Rule => Rule.unique().error('Уже есть такой тег…')
    },
    {
      name: 'directions',
      title: 'Направления',
      type: 'array',
      description: 'Нужно добавлять как минимум одно направление. Больше нужно только для экскурсий с несколькими направлениями',
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
      title: 'Характеристики (список, через перенос строки)',
      description: 'список, который виден на превью',
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
      type: 'text',
      validation: Rule => Rule.required(),
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
      description: 'Например: «Ваши яркие впечатления всего за». Цену указывать не нужно',
      type: 'string'
    },
    {
      name: 'price',
      title: 'Стоимость по умолчанию',
      type: 'string'
    },
    {
      name: 'priceWidget',
      title: '… или код виджета стороннего сервиса',
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
      type: 'text',
      description: '||$льготный||  ||$детский||  ||$детский3||  ||$детский5||  ||$иностранный||'
    },
    {
      name: 'prevention',
      title: 'Предупреждение',
      type: 'text',
      description: 'Пассажиры до 18 лет допускаются на борт в присутствии старших сопровождающих.'
    },
    {
      name: 'routeMap',
      title: 'Ссылка на карту маршрута',
      type: 'url'
    },
    {
      title: 'Язык экскурсии',
      name: 'tourLanguage',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Язык',
          to: { type: 'settingTourLanguages' }
        }
      ],
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
      of: [
        {
          type: 'reference',
          title: 'На борту',
          to: { type: 'settingPlaceFeatures' }
        }
      ],
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
      name: 'duration',
      title: 'Длительность',
      type: 'string'
    },
    {
      name: 'schedule',
      title: 'Расписание',
      type: 'text'
    },
    {
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      options: { layout: 'grid' },
      of: [
        {
          title: 'Фотография',
          type: 'image',
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Описание',
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ]
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'logo'
    }
  }
}
