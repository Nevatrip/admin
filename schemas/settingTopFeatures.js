export default {
  name: 'settingTopFeatures',
  title: 'Преимущества после баннера на главной',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Описание',
      description: 'Краткое',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Ссылка',
      type: 'localeString',
    },
    {
      name: 'icon',
      title: 'Иконка',
      type: 'image',
      required: true,
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'icon'
    }
  }
}
