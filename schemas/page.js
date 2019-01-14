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
      options: {
        source: 'title',
        maxLength: 96
      }
    },
  ],
}
