export default {
  name: 'settingSocials',
  title: 'Социальные сети',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Ссылка',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Изображение',
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