import { defineDocument } from 'sanity-typed-queries'
import FaFortAwesome from 'react-icons/lib/fa/fort-awesome';
import slugValidator from '../components/slugValidator'
import { defaultLang } from '../src/langs'
import { localeString } from './localeString'
import { localeText } from './localeText';

const { sight, document, builder } = defineDocument( 'sight', {
  title: {
    type: 'localeString',
    title: 'Имя',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Это ключ для программиста, должен быть человекопонятным. Если достопримечательность планета, то ключ должен быть — planet',
    validation: slugValidator,
    options: {
      source: `title.${ defaultLang }`,
      maxLength: 96,
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

document.title = 'Достопримечательность'
document.icon = FaFortAwesome
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
  }
}

export { builder, sight }
export default document