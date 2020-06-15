import { defineObject } from 'sanity-typed-queries'
import FaExchange from 'react-icons/lib/fa/exchange'
import { defaultLang } from '../src/langs'
import { localeString } from './localeString'
import { ticket } from './ticket'
import { direction } from './direction'

const { complex, object } = defineObject( 'complex', {
  title: {
    type: 'localeString',
    title: 'Название',
  },
  isEveryOwnDate: {
    type: 'boolean',
    title: 'У каждого направления своя дата',
    description: 'Если включено, каждое из направлений будет иметь собственный календарь. По умолчанию выключено, т. е. все направления имеют общую дату'
  },
  tickets: {
    type: 'array',
    title: 'Билеты',
    of: [ { type: 'ticket' } ]
  },
  nested: {
    type: 'array',
    title: 'Одиночные направления',
    of: [
      {
        // type: 'direction',
        type: 'text',
        title: 'Выбрать одиночное направление',
        // fields: [
        //   {
        //     name: '_key',
        //     type: 'string',
        //   },
        //   {
        //     name: '_type',
        //     type: 'string',
        //   }
        // ]
      }
    ]
  }
}, [
  localeString,
  ticket,
  direction,
] )

object.title = '«Составная» экскурсия'
object.icon = FaExchange
object.preview = {
  select: {
    title: `title.${ defaultLang }`,
  }
}

export { complex }
export default object