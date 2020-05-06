import supportedLanguages from '../src/langs';

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
  fields: supportedLanguages.map( lang => (
    {
      title: lang.title,
      name: lang.id,
      type: 'text',
      fieldset: lang.isDefault ? null : 'translations',
    }
  ))
}