import supportedLanguages from '../src/langs';

export default {
  name: 'localeString',
  title: 'localeString',
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
      type: 'string',
      fieldset: lang.isDefault ? null : 'translations',
    }
  ))
}