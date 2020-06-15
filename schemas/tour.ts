import { defineDocument } from 'sanity-typed-queries'
import IoAndroidBoat from 'react-icons/lib/io/android-boat'
import supportedLanguages, { defaultLang } from '../src/langs'
import { localeString } from './localeString'
import { localeMarkdown } from './localeMarkdown'
import { localeText } from './localeText'
import { localeTitleSlug } from './localeTitleSlug'
import { direction } from './direction'
import { complex } from './complex';
import { ticket } from './ticket'
import { settingServiceCategory } from './settingServiceCategory'
import { settingServiceTag } from './settingServiceTag'
import { point } from './point'
import { apiProvider } from './apiProvider'
import { place } from './place'
import { settingPlaceFeatures } from './settingPlaceFeatures'
import { settingTicketPrint } from './settingTicketPrint'
import { settingTourLanguages } from './settingTourLanguages'
import { sight } from './sight'

const { tour, document, builder } = defineDocument( 'tour', {
  directions: {
    type: 'array',
    title: 'Направления',
    description: 'Нужно добавлять как минимум одно направление. Больше нужно только для экскурсий с несколькими направлениями',
    options: { editModal: 'fullscreen', },
    of: [
      { type: 'direction' },
      { type: 'complex' },
    ],
    // inputComponent: Direction
  },
  status: {
    type: 'array',
    title: 'Статус',
    of: [ { type: 'string' } ],
    options: {
      list: [
        { title: 'Не показывать в списке категории', value: 'hidden' },
        { title: 'Снять с публикации', value: 'deleted' },
      ]
    }
  },
  title: {
    type: 'localeTitleSlug',
    title: 'Заголовок',
    description: 'Для экскурсий со старого сайта Ключ должен совпадать с полем "Псевдоним"',
  },
  titleLong: {
    type: 'localeString',
    title: 'Расширенный заголовок',
    description: 'Развернутый заголовок статьи для мета тегов',
    validation: Rule => Rule.required(),
  },
  breadcrumb: {
    title: 'Хлебная крошка',
    type: 'localeString',
    description: 'Краткая версия заголовка для хлебных крошек',
  },
  descriptionMeta: {
    type: 'localeString',
    title: 'Описание для мета тегов',
    description: 'Краткое описание статьи для мета тегов',
    validation: Rule => Rule.required(),
  },
  tourPriority: {
    type: 'number',
    title: 'Позиция в меню',
    description: 'Число, в каком порядке показывать эскурсию, чем меньше число, тем выше экскурсия.'
  },
  titleImage: {
    type: 'image',
    title: 'Главное изображение',
    description: 'Настройка: "Edit", Центр круга: центр для превью, Черная область: область для показа на детальной',
    options: { hotspot: true },
  },
  previewImage: {
    type: 'image',
    title: 'Изображение для превью',
    description: 'Если не загружено, то оно берется из центра круга главного изображения выше',
  },
  imagesGallery: {
    type: 'array',
    title: 'Загрузить картинки',
    of: [ { type: 'image' } ],
  },
  category: {
    type: 'reference',
    title: 'Категория',
    to: [ { type: 'settingServiceCategory' } ],
    validation: Rule => Rule.required(),
  },
  buyLink: {
    type: 'localeString',
    title: 'Ссылка на форму покупки',
    description: 'Нет ссылки - нет кнопки',
    validation: Rule => Rule.required(),
  },
  tags: {
    type: 'array',
    title: 'Теги',
    of: [
      {
        type: 'reference',
        title: 'Тег',
        to: [ { type: 'settingServiceTag' } ]
      }
    ],
    // validation: Rule => Rule.unique().error( 'Уже есть такой тег…' ),
  },
  features: {
    type: 'localeText',
    title: 'Характеристики (список, через перенос строки)',
    description: 'список, который виден на превью',
  },
  descriptionPrepend: {
    type: 'localeMarkdown',
    title: 'Дополнительная информация перед описанием',
  },
  description: {
    type: 'localeMarkdown',
    title: 'Описание',
    description: 'Основной текст, сюда нельзя добавлять заголовок h1',
    validation: Rule => Rule.required(),
  },
  descriptionAppend: {
    type: 'localeMarkdown',
    title: 'Дополнительная информация после описания',
  },
  advice: {
    type: 'localeText',
    title: 'Совет от организатора',
  },
  point: {
    type: 'array',
    title: 'Причалы отправления',
    of: [
      {
        type: 'reference',
        title: 'Причал',
        to: [ { type: 'point' } ],
      }
    ],
  },
  priceDescription: {
    type: 'localeString',
    title: 'Текст с призывом перед последней ценой на странице экскурсии',
    description: 'Например: «Ваши яркие впечатления всего за». Цену указывать не нужно',
  },
  price: {
    type: 'string',
    title: 'Стоимость по умолчанию',
  },
  priceWidget: {
    type: 'string',
    title: '… или код виджета стороннего сервиса',
  },
  priceOld: {
    type: 'localeString',
    title: 'Стоимость на причале',
    description: 'Если не прописано иностранной цены, берётся русская'
  },
  pricesDescription: {
    type: 'localeText',
    title: 'Описание цены, 1ый пункт в списке справа на детальной',
    description: 'Например: **Стоимость**: В одну сторону - 2₽, туда-обратно - 3₽ (по 1,5₽ за билет). На причале 8₽'
  },
  sale: {
    type: 'localeText',
    title: 'Скидки',
    description: '||$льготный||  ||$детский||  ||$детский3||  ||$детский5||  ||$иностранный||'
  },
  prevention: {
    type: 'localeText',
    title: 'Предупреждение',
    description: 'Пассажиры до 18 лет допускаются на борт в присутствии старших сопровождающих.'
  },
  routeMap: {
    type: 'url',
    title: 'Ссылка на карту маршрута',
  },
  tourLanguage: {
    title: 'Язык экскурсии',
    type: 'array',
    of: [
      {
        type: 'reference',
        title: 'Язык',
        to: [ { type: 'settingTourLanguages' } ],
      }
    ],
  },
  attractions: {
    type: 'array',
    title: 'Достопримечательности',
    of: [
      { type: 'reference', to: [ { type: 'sight' } ] },
    ],
  },
  end: {
    type: 'datetime',
    title: 'Окончание навигации',
    options: {
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      timeStep: 15,
      calendarTodayLabel: 'Сегодня'
    }
  },
  place: {
    type: 'reference',
    title: 'Транспортное средство',
    to: [ { type: 'place' } ],
  },
  placeFeatures: {
    type: 'array',
    title: 'Что есть на борту',
    of: [
      {
        type: 'reference',
        title: 'На борту',
        to: [ { type: 'settingPlaceFeatures' } ]
      }
    ],
  },
  ticketPrint: {
    type: 'reference',
    title: 'Печатать билет',
    to: [ { type: 'settingTicketPrint' } ],
  },
  partner: {
    type: 'reference',
    title: '!!!Очистить это поле на всех экскурсиях и перенести значение в соответствующее поле в разделе "Направления" вверху этой страницы',
    to: [ { type: 'apiProvider' } ],
  },
  partnerName: {
    type: 'string',
    title: '!!!Очистить это поле на всех экскурсиях и перенести значение в соответствующее поле в разделе "Направления" вверху этой страницы',
  },
  duration: {
    type: 'localeString',
    title: 'Длительность',
  },
  schedule: {
    type: 'localeText',
    title: 'Расписание',
  },
  gallery: {
    type: 'array',
    title: 'Галерея',
    options: { layout: 'grid' },
    of: [
      {
        title: 'Фотография',
        type: 'image',
        fields: [
          // {
          //   type: 'localeString',
          //   name: 'description',
          //   title: 'Описание',
          //   options: {
          //     isHighlighted: true
          //   }
          // }
        ]
      }
    ]
  },
}, [
  apiProvider,
  direction,
  complex,
  localeMarkdown,
  localeString,
  localeText,
  localeTitleSlug,
  place,
  point,
  settingPlaceFeatures,
  settingServiceCategory,
  settingServiceTag,
  settingTicketPrint,
  settingTourLanguages,
  sight,
  ticket,
] )

document.title = 'Экскурсия';
document.icon = IoAndroidBoat;
document.preview = {
  select: {
    title: 'title',
    titleImage: 'titleImage',
    previewImage: 'previewImage',
    category: `category.title.${ defaultLang }.name`,
  },
  prepare( selection ) {
    const { title, titleImage, previewImage, category } = selection
    const { id } = supportedLanguages.find( item => ( title[ item.id ] || {} ).name )
    const langs = supportedLanguages.filter( item => (( title[ item.id ] || {} ).key || {} ).current ).map( item => item.id ).join(', ')

    return {
      title: title[ id ].name,
      media: titleImage || previewImage,
      subtitle: `${ category } — ${ langs }`
    }
  }
}

export { builder, tour }
export default document