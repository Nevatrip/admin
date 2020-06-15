import { defineObject } from 'sanity-typed-queries'
import supportedLanguages from '../src/langs'

const langs = supportedLanguages.reduce( ( acc, lang ) => {
  acc[ lang.id ] = {
    type: 'markdown',
    title: lang.title,
    fieldset: lang.isDefault ? null : 'translations',
  }
  
  return acc
}, {} )

const { localeMarkdown, object } = defineObject( 'localeMarkdown', langs )

object.fieldsets = [
  {
    title: 'Переводы',
    name: 'translations',
    options: { collapsible: true },
  }
]

export { localeMarkdown }
export default object