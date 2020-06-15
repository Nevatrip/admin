import { defineDocument } from 'sanity-typed-queries'
import slugValidator from '../components/slugValidator'
import FaPrint from 'react-icons/lib/fa/print'

const { settingTicketPrint, document, builder } = defineDocument( 'settingTicketPrint', {
  title: {
    type: 'string',
    title: 'Значение',
    validation: Rule => Rule.required(),
  },
  key: {
    type: 'slug',
    title: 'Ключ',
    description: 'Это ключ для программиста, должен быть человекопонятным. Если печать зависит от автобуса, то ключ должен быть — bus',
    validation: slugValidator,
    options: {
      source: 'title',
      maxLength: 96
    }
  },
} )

document.title = 'Печать билета'
document.icon = FaPrint

export { builder, settingTicketPrint }
export default document