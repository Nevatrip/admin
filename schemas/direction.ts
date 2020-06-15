import { defineObject } from 'sanity-typed-queries'
import FaLongArrowRight from 'react-icons/lib/fa/long-arrow-right'
import { defaultLang } from '../src/langs'
import { localeString } from './localeString'
import { apiProvider } from './apiProvider'
import { ticket } from './ticket'
import { point } from './point'
import { localeText } from './localeText'
import { event } from './event'

const { direction, object } = defineObject( 'direction', {
  title: {
    type: 'localeString',
    title: 'Название',
    description: 'Название используется в билете, должно быть заполнено на всех продаваемых языках'
  },
  partner: {
    type: 'reference',
    title: 'Партнёр/оператор',
    to: [ { type: 'apiProvider' } ],
  },
  partnerName: {
    type: 'string',
    title: 'Название экскурсии для оператора',
  },
  map: {
    type: 'string',
    title: 'Карта',
    description: 'Ссылка на яндекс или гугл-карту текущего маршрута'
  },
  tickets: {
    type: 'array',
    title: 'Билеты',
    of: [ { type: 'ticket' } ]
  },
  point: {
    type: 'reference',
    title: 'Причал',
    to: [ { type: 'point' } ],
  },
  buyTimeOffset: {
    type: 'number',
    title: 'За сколько минут до рейса прекратить продажу',
  },
  ticketInfo: {
    type: 'localeText',
    title: 'Инфо в билете',
    description: 'Инфо в билете рядом с восклицательным знаком'
  },
  schedule: {
    type: 'array',
    title: 'Расписание',
    of: [
      { type: 'event' }
    ],
    // inputComponent: Schedule,
  }
}, [
  localeString,
  apiProvider,
  ticket,
  point,
  localeText,
  event,
] )

object.title = 'Одиночное направление'
object.icon = FaLongArrowRight
object.preview = {
  select: {
    title: `title.${ defaultLang }`,
  }
}

export { direction }
export default object