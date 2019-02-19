const supportedLanguages = [
  {id: 'ru', title: 'Русский', isDefault: true},
  {id: 'en', title: 'Английский'},
  {id: 'zh', title: 'Китайский'}
];

export default {
  name: 'localeTitleSlug',
  title: 'localeTitleSlug',
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
      type: 'object',
      fieldset: lang.isDefault ? null : 'translations',
      fields: [
        {
          title: 'Заголовок',
          name: 'name',
          type: 'string',
        },
        {
          title: 'Ключ',
          description: 'Если ключ не заполнен, то страница не отобразится на этом языке',
          name: 'key',
          type: 'slug',
          options: {
            source: options => ((typeof options.title !== 'undefined')&&(typeof options.title[lang.id] !== 'undefined')) ? `${options.title[lang.id].name}` : '',
            maxLength: 96,
          }
        }
      ]
    }
  ))
}