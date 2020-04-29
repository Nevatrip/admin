import supportedLanguages from '../src/langs';

export default {
  name: 'localeImage',
  title: 'localeImage',
  type: 'object',
  fieldsets: [
    {
      title: 'Переводы',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: supportedLanguages.map(( lang, index ) => (
    {
      title: lang.title,
      name: lang.id,
      type: 'image',
      fieldset: index === 0 ? null : 'translations',
    }
  ))
}
