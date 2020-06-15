import { defineObject } from 'sanity-typed-queries'
import supportedLanguages from '../src/langs'

const langs = supportedLanguages.reduce( ( acc, lang ) => {
  acc[ lang.id ] = {
    type: 'text',
    title: lang.title,
    fieldset: lang.isDefault ? null : 'translations',
  }
  
  return acc
}, {} )

const { localeText, object } = defineObject( 'localeText', langs )

object.fieldsets = [
  {
    title: 'Переводы',
    name: 'translations',
    options: { collapsible: true },
  }
]

export { localeText }
export default object