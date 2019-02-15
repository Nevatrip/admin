export default {
  name: 'settingServiceCategory',
  title: 'Категории экскурсий',
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
      name: 'subTitle',
      title: 'Подзаголовок',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.ru.name',
      media: 'logo'
    }
  }
}
