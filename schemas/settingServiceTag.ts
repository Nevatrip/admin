import { defineDocument } from 'sanity-typed-queries'
import { defaultLang } from '../src/langs'
import slugValidator from '../components/slugValidator'
import FaTags from 'react-icons/lib/fa/tags'
import { localeString } from './localeString'

const { settingServiceTag, document, builder } = defineDocument( 'settingServiceTag', {
  title: {
    type: 'localeString',
    title: 'Заголовок',
    validation: Rule => Rule.required(),
  },
  subTitle: {
    type: 'localeString',
    title: 'Подзаголовок',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Это ключ для программиста, должен быть человекопонятным. Если тег день, то ключ должен быть — day',
    validation: slugValidator,
    options: {
      source: `title.${ defaultLang }`,
      maxLength: 96
    }
  },
}, [
  localeString,
] )

document.title = 'Теги'
document.icon = FaTags
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
  }
}

export { builder, settingServiceTag }
export default document