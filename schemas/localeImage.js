const supportedLanguages = JSON.parse(process.env.SANITY_STUDIO_LANGS);

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
  fields: supportedLanguages.map(lang => (
    {
      title: lang.title,
      name: lang.id,
      type: 'image',
      fieldset: lang.isDefault ? null : 'translations'
    }
  ))
}
