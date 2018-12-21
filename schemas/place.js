export default {
  name: 'place',
  title: 'Транспортное средство/площадка',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
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
    {
      name: 'description',
      title: 'Описание',
      type: 'text'
    },
    {
      name: 'api',
      title: 'Значение в API партнёра',
      type: 'apiRelation'
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  }
}
