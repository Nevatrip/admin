export default {
  name: 'page',
  title: 'Страницы',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'titleLong',
      title: 'Расширенный заголовок',
      type: 'string',
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
}
