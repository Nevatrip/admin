import { defineDocument } from 'sanity-typed-queries'
import FaTicket from 'react-icons/lib/fa/ticket'
import slugValidator from '../components/slugValidator'
import { defaultLang } from '../src/langs'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { apiRelation } from './apiRelation'

const { ticketType, document, builder } = defineDocument( 'ticketType', {
  title: {
    type: 'localeString',
    title: 'Тип билета',
  },
  name: {
    title: 'Ключ',
    description: 'Это ключ для программиста, должен быть человекопонятным. Если тип билета взрослый, то ключ должен быть — adult',
    type: 'slug',
    validation: slugValidator,
    options: {
      source: `title.${ defaultLang }`,
      maxLength: 96,
    }
  },
  description: {
    type: 'localeText',
    title: 'Description',
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

document.title = 'Тип билета'
document.icon = FaTicket
document.preview = {
  select: {
    title: `title.${ defaultLang }`,
    subtitle: 'name.current',
  }
}

export { builder, ticketType }
export default document