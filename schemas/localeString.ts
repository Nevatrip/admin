import { defineObject } from 'sanity-typed-queries'
import supportedLanguages from '../src/langs'

const langs = supportedLanguages.reduce( ( acc, lang ) => {
  acc[ lang.id ] = {
    type: 'string',
    title: lang.title,
    fieldset: lang.isDefault ? null : 'translations',
  }
  
  return acc
}, {} )

const { localeString, object } = defineObject( 'localeString', langs )

object.fieldsets = [
  {
    title: 'Переводы',
    name: 'translations',
    options: { collapsible: true },
  }
]

export { localeString }
export default object