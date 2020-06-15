import { defineDocument } from 'sanity-typed-queries'
import { defaultLang } from '../src/langs'
import slugValidator from '../components/slugValidator'
import FaCoffee from 'react-icons/lib/fa/coffee'
import { localeString } from './localeString'

const { settingPlaceFeatures, document, builder } = defineDocument( 'settingPlaceFeatures', {
  title: {
    type: 'localeString',
    title: 'Имя',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Ключ для программиста. Должен быть человекопонятным: если элементом является туалет, то в ключе пишем — ws',
    validation: slugValidator,
    options: {
      source: `title.${ defaultLang }`,
      maxLength: 96
    }
  },
  logo: {
    type: 'image',
    title: 'Логотип',
    validation: Rule => Rule.required(),
  },
  description: {
    type: 'string',
    title: 'Описание',
    validation: Rule => Rule.required(),
  },
}, [
  localeString,
] )

document.title = 'Что есть на борту'
document.icon = FaCoffee
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
    media: 'logo',
  }
}

export { builder, settingPlaceFeatures }
export default document