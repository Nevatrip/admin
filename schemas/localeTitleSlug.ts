import { defineObject } from 'sanity-typed-queries'
import supportedLanguages from '../src/langs'
import slugValidator from '../components/slugValidator'

const langs = supportedLanguages.reduce( ( acc, lang ) => {
  acc[ lang.id ] = {
    type: 'object',
    title: lang.title,
    fieldset: lang.isDefault ? null : 'translations',
    fields: [
      {
        type: 'string',
        name: 'name',
        title: 'Заголовок',
      },
      {
        type: 'slug',
        name: 'key',
        title: 'Ключ',
        description: 'Это часть урла. Это человекопонятное название экскурсии, которое используется в урле. Если название экскурсии "Слон", то ключ должен быть — slon. Если ключ не заполнен, то страница не отобразится на этом языке',
        validation: slugValidator,
        options: {
          source: options => (
            ( typeof options.title !== 'undefined' ) && ( typeof options.title[ lang.id ] !== 'undefined') )
              ? `${ options.title[ lang.id ].name }`
              : '',
          maxLength: 96,
        }
      }
    ],
  }
  
  return acc
}, {} )

const { localeTitleSlug, object } = defineObject( 'localeTitleSlug', langs )

object.fieldsets = [
  {
    title: 'Переводы',
    name: 'translations',
    options: { collapsible: true },
  }
]

export { localeTitleSlug }
export default object