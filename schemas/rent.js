export default {
  name: 'rent',
  title: 'Аренда',
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
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}