const supportedLanguages = [
  {id: 'ru', title: 'Русский', isDefault: true},
  {id: 'en', title: 'Английский'},
  {id: 'de', title: 'Немецкий'},
  {id: 'cz', title: 'Чешский'},
  {id: 'zh', title: 'Китайский'}
]

export default {
  name: 'localeBanner',
  title: 'localeBanner',
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
          name: 'tour',
          title: 'Экскурсия / товар',
          type: 'reference',
          to: { type: 'tour' },
          required: true,
          validation: Rule => Rule.required(),
        },
        {
          name: 'titleImage',
          title: 'Баннер-изображение',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'link',
          title: 'Ссылка',
          type: 'string',
          description: 'Куда ведет ссылка с баннера-изображения',
        },
      ]
    }
  ))
}
