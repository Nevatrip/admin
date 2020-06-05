import supportedLanguages from '../src/langs';

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
  fields: supportedLanguages.map( lang => (
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
        },
        {
          name: 'titleImage',
          title: 'Баннер-изображение',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'titleImageSm',
          title: 'Баннер-изображение для мобилы',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'title',
          title: 'Заголовок баннера-изображения',
          type: 'string',
          description: 'Будет прописан в ALT и TITLE изображения',
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
