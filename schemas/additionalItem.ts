import { defineObject } from 'sanity-typed-queries'
import { apiRelation } from './apiRelation'

const { additionalItem, object } = defineObject( 'additionalItem', {
  name: {
    type: 'string',
    title: 'Название',
  },
  price: {
    type: 'number',
    title: 'Стоимость',
  },
  description: {
    type: 'text',
    title: 'Описание',
  },
  api: {
    type: 'array',
    title: 'Значение в API партнёра',
    description: 'Поле для программиста',
    of: [ { type: 'apiRelation' } ]
  }
}, [
  apiRelation,
] )

export { additionalItem }
export default object