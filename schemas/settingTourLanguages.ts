import { defineDocument } from 'sanity-typed-queries'
import MdLanguage from 'react-icons/lib/md/language'
import slugValidator from '../components/slugValidator'
import { defaultLang } from '../src/langs'
import { localeString } from './localeString'

const { settingTourLanguages, document, builder } = defineDocument( 'settingTourLanguages', {
  title: {
    type: 'localeString',
    title: 'Название',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Это ключ для программиста, должен быть человекопонятным и соответствовать ISO639-1: https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2',
    validation: slugValidator,
    options: {
      source: `title.${ defaultLang }`,
      maxLength: 2,
    }
  },
  icon: {
    type: 'image',
    title: 'Флаг',
    validation: Rule => Rule.required(),
  },
}, [
  localeString,
] )

document.title = 'Языки экскурсии'
document.icon = MdLanguage
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
    media: 'icon',
  }
}

export { builder, settingTourLanguages }
export default document