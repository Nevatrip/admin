export default {
  name: 'settingServiceTag',
  title: 'Теги',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'subTitle',
      title: 'Подзаголовок',
      type: 'localeString',
      required: true,
    },
    {
      name: 'key',
      title: 'Ключ',
      type: 'slug',
      required: true,
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
    }
  }
}
