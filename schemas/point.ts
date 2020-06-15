import { defineDocument } from 'sanity-typed-queries'
import { defaultLang } from '../src/langs'
import slugValidator from '../components/slugValidator'
import FaMapMarker from 'react-icons/lib/fa/truck'
import { localeString } from './localeString'
import { localeText } from './localeText'

const { point, document, builder } = defineDocument( 'point', {
  title: {
    type: 'localeString',
    title: 'Имя',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Ключ для программиста. Должен быть человекопонятным: если остановка «Площадь Ленина», то в ключе пишем — ploshad-lenina',
    validation: slugValidator,
    options: {
      source: `title.${ defaultLang }`,
      maxLength: 96
    }
  },
  description: {
    type: 'localeText',
    title: 'Описание',
  },
  coords: {
    type: 'geopoint',
    title: 'Координаты',
  },
  image: {
    type: 'image',
    title: 'Фотография',
    options: {
      hotspot: true
    }
  },
  phone: {
    type: 'string',
    title: 'Контакты',
  },
}, [
  localeString,
  localeText,
] )

document.title = 'Причал/Остановка'
document.icon = FaMapMarker
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
    media: 'logo',
  }
}

export { builder, point }
export default document