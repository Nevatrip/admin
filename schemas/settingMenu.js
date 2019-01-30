export default {
  name: 'settingMenu',
  title: 'Навигация',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
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
    {
      name: 'menu',
      title: 'Пункты меню',
      type: 'array',
      of: [
        { title: 'Страница', name: 'page', type: 'reference', to: { type: 'page' } },
        { title: 'Категория', name: 'category', type: 'reference', to: { type: 'settingServiceCategory' } },
      ]
    },
  ],
}
