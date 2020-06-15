import { defineDocument } from 'sanity-typed-queries'
import FaPiedPiperAlt from 'react-icons/lib/fa/pied-piper-alt'
import slugValidator from '../components/slugValidator'
import { defaultLang } from '../src/langs'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { apiRelation } from './apiRelation'

const { placeCategory, document, builder } = defineDocument( 'placeCategory', {
  title: {
    type: 'localeString',
    title: 'Категория места',
  },
  name: {
    type: 'slug',
    title: 'Ключ',
    description: 'Это ключ для программиста, должен быть человекопонятным. Если категория места ВИП, то ключ должен быть — vip',
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
  api: {
    type: 'apiRelation',
    title: 'Значение в API партнёра',
    description: 'Поле для программиста',
  }
}, [
  localeString,
  localeText,
  apiRelation,
] )

document.title = 'Категория места'
document.icon = FaPiedPiperAlt
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
    subtitle: 'name.current',
  }
}

export { builder, placeCategory }
export default document