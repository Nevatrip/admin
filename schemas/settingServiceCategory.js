export default {
  name: 'settingServiceCategory',
  title: 'Категории экскурсий',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      required: true,
    },
    {
      name: 'subTitle',
      title: 'Подзаголовок',
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