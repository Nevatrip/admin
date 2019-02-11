export default {
  name: 'place',
  title: 'Транспортное средство/площадка',
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
      name: 'key',
      title: 'Ключ',
      type: 'slug',
      required: true,
      validation: Rule => Rule.required(),
      options: {
        source: 'title.ru',
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'localeText'
    },
    {
      name: 'api',
      title: 'Значение в API партнёра',
      type: 'apiRelation'
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'logo'
    }
  }
}
