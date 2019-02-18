import htmlPreview from 'sanity-plugin-markdown/html-preview'

const supportedLanguages = [
  {id: 'ru', title: 'Русский', isDefault: true},
  {id: 'en', title: 'Английский'},
  {id: 'zh', title: 'Китайский'}
]

export default {
  name: 'localeMarkdown',
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
      type: 'markdown',
      options: {
        renderPreview: htmlPreview
      },
      fieldset: lang.isDefault ? null : 'translations'
    }
  ))
}