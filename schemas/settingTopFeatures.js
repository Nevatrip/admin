export default {
  name: 'settingTopFeatures',
  title: 'Преимущества после баннера на главной',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Описание',
      description: 'Краткое',
      type: 'localeString',
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
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'icon'
    }
  }
}