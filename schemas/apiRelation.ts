import { defineObject } from 'sanity-typed-queries'
import { apiProvider } from './apiProvider'

const { apiRelation, object } = defineObject( 'apiRelation', {
  provider: {
    type: 'reference',
    title: 'API',
    to: [ { type: 'apiProvider' } ],
    validation: Rule => Rule.required(),
  },
  value: {
    type: 'string',
    title: 'Значение',
    validation: Rule => Rule.required(),
  },
}, [
  apiProvider,
] )

object.preview = {
  select: {
    title: 'provider.title',
    value: 'value'
  },
  prepare( selection ) {
    const { title, value } = selection

    return {
      title: `${ title } — ${ value }`
    }
  }
}

export { apiRelation }
export default object