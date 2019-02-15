export default {
  name: 'page',
  title: 'Страницы',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'titleLong',
      title: 'Расширенный заголовок',
      type: 'localeString',
      required: true,
    },
  ],
  preview: {
    select: {
      title: 'title.ru.name',
      media: 'logo'
    }
  }
}
