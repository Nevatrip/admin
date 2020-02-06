const supportedLanguages = [
  {id: 'ru', title: 'Русский', isDefault: true},
  {id: 'en', title: 'Английский'},
  {id: 'de', title: 'Немецкий'},
  {id: 'cs', title: 'Чешский'},
  {id: 'zh', title: 'Китайский'}
]

export default {
  name: 'localeText',
  title: 'localeText',
  type: 'object',
  fieldsets: [
    {
      title: 'Переводы',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: supportedLanguages.map(lang => (
    {
      title: lang.title,
      name: lang.id,
      type: 'text',
      fieldset: lang.isDefault ? null : 'translations'
    }
  ))
}