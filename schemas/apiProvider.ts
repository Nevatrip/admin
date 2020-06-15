import { defineDocument } from 'sanity-typed-queries'
import slugValidator from '../components/slugValidator'
import FaSuitcase from 'react-icons/lib/fa/suitcase'

const { apiProvider, document, builder } = defineDocument( 'apiProvider', {
  title: {
    type: 'string',
    title: 'Имя',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Ключ для программиста. Должен быть человекопонятным: если партнёр Яндекс, то в ключе пишем — yandex',
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

document.title = 'Партнёры'
document.icon = FaSuitcase
document.preview = {
  select: {
    title: 'title',
    media: 'logo',
  }
}

export { builder, apiProvider }
export default document