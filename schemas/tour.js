import FaExchange from 'react-icons/lib/fa/exchange';
import IoAndroidBoat from 'react-icons/lib/io/android-boat';

export default {
  name: 'tour',
  title: 'Экскурсия',
  type: 'document',
  icon: IoAndroidBoat,
  fields: [
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
              title: 'У каждого направления своя дата',
              name: 'isEveryOwnDate',
              type: 'boolean',
              description: 'Если включено, каждое из направлений будет иметь собственный календарь. По умолчанию выключено, т. е. все направления имеют общую дату'
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
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      description: 'Для экскурсий со старого сайта Ключ должен совпадать с полем "Псевдоним"',
    },
    {
      name: 'titleLong',
      title: 'Расширенный заголовок',
      type: 'localeString',
      description: 'Развернутый заголовок статьи для мета тегов',
      required: true,
    },
    {
      name: 'breadcrumb',
      title: 'Хлебная крошка',
      type: 'localeString',
      description: 'Краткая версия заголовка для хлебных крошек',
    },
    {
      name: 'descriptionMeta',
      title: 'Описание для мета тегов',
      type: 'localeString',
      description: 'Краткое описание статьи для мета тегов',
      required: true,
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
      name: 'tourPriority',
      title: 'Позиция в меню',
      type: 'number',
      description: 'Число, в каком порядке показывать эскурсию, чем меньше число, тем выше экскурсия.'
    },
    {
      name: 'titleImage',
      title: 'Главное изображение',
      type: 'image',
      description: 'Настройка: "Edit", Центр круга: центр для превью, Черная область: область для показа на детальной',
      options: { hotspot: true },
    },
    {
      name: 'previewImage',
      title: 'Изображение для превью',
      type: 'image',
      description: 'Если не загружено, то оно берется из центра круга главного изображения выше',
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Категория',
      to: { type: 'settingServiceCategory' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'buyLink',
      title: 'Ссылка на форму покупки',
      type: 'localeString',
      required: true,
      description: 'Нет ссылки - нет кнопки',
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
      name: 'features',
      title: 'Характеристики (список, через перенос строки)',
      description: 'список, который виден на превью',
      type: 'localeText'
    },
    {
      name: 'descriptionPrepend',
      title: 'Дополнительная информация перед описанием',
      type: 'localeMarkdown'
    },
    {
      name: 'description',
      title: 'Описание',
      description: 'Основной текст, сюда нельзя добавлять заголовок h1',
      type: 'localeMarkdown',
      validation: Rule => Rule.required(),
    },
    {
      name: 'descriptionAppend',
      title: 'Дополнительная информация после описания',
      type: 'localeMarkdown'
    },
    {
      name: 'advice',
      title: 'Совет от организатора',
      type: 'localeText'
    },
    {
      title: 'Причалы отправления',
      name: 'point',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Причал',
          to: {type: 'point'}
        }
      ],
    },
    {
      name: 'priceDescription',
      title: 'Текст с призывом перед последней ценой на странице экскурсии',
      description: 'Например: «Ваши яркие впечатления всего за». Цену указывать не нужно',
      type: 'localeString'
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
      type: 'localeString',
      description: 'Если не прописано иностранной цены, берётся русская'
    },
    {
      name: 'pricesDescription',
      title: 'Описание цены, 1ый пункт в списке справа на детальной',
      type: 'localeText',
      description: 'Например: **Стоимость**: В одну сторону - 2₽, туда-обратно - 3₽ (по 1,5₽ за билет). На причале 8₽'
    },
    {
      name: 'sale',
      title: 'Скидки',
      type: 'localeText',
      description: '||$льготный||  ||$детский||  ||$детский3||  ||$детский5||  ||$иностранный||'
    },
    {
      name: 'prevention',
      title: 'Предупреждение',
      type: 'localeText',
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
        { type: 'reference', to: { type: 'sight' } },
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
      title: '!!!Очистить это поле на всех экскурсиях и перенести значение в соответствующее поле в разделе "Направления" вверху этой страницы',
      to: { type: 'apiProvider' },
    },
    {
      name: 'partnerName',
      title: '!!!Очистить это поле на всех экскурсиях и перенести значение в соответствующее поле в разделе "Направления" вверху этой страницы',
      type: 'string'
    },
    {
      name: 'duration',
      title: 'Длительность',
      type: 'localeString'
    },
    {
      name: 'schedule',
      title: 'Расписание',
      type: 'localeText'
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
              type: 'localeString',
              title: 'Описание',
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'oldId',
      title: 'ID в старой админке',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'title',
      titleImage: 'titleImage',
      previewImage: 'previewImage',
      category: 'category.title.ru.name'
    },
    prepare(selection) {
      const { title, titleImage, previewImage, category } = selection;
      
      return {
        media: titleImage || previewImage,
        title: (title.ru || {}).name || (title.en || {}).name  || (title.de || {}).name  || (title.cs || {}).name || (title.zh || {}).name,
        subtitle: `${category} — ${((title.ru || {}).key || {}).current ? 'ru ' : ''}${((title.en || {}).key||{}).current ? 'en ' : ''}${((title.de || {}).key||{}).current ? 'de ' : ''}${((title.cs || {}).key||{}).current ? 'cs ' : ''}${((title.zh || {}).key||{}).current ? 'zh ' : ''}`
      }
    }
  }
}
