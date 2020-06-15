import { defineDocument } from 'sanity-typed-queries'
import { defaultLang } from '../src/langs'
import slugValidator from '../components/slugValidator'
import FaTruck from 'react-icons/lib/fa/truck'

const { place, document, builder } = defineDocument( 'place', {
  title: {
    type: 'string',
    title: 'Имя',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Ключ для программиста. Должен быть человекопонятным: если средство автобус, то в ключе пишем — bus',
    validation: slugValidator,
    options: {
      source: 'title',
      maxLength: 96
    }
  },
  partnerContract: {
    type: 'string',
    title: '№ партнёрского договора',
  },
  email: {
    type: 'string',
    title: 'Email партнёра',
  },    
  logo: {
    type: 'image',
    title: 'Логотип',
  },
  description: {
    type: 'text',
    title: 'Описание',
  }
} )

document.title = 'Транспортное средство/площадка'
document.icon = FaTruck
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
    media: 'logo',
  }
}

export { builder, place }
export default document