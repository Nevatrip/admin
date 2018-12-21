export default {
  name: 'ticketType',
  title: 'Тип билета',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Тип билета',
      type: 'string',
      required: true,
    },
    {
      name: 'name',
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
      title: 'Description',
      type: 'text'
    },
    {
      name: 'api',
      title: 'Значение в API партнёра',
      type: 'apiRelation'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name.current'
    }
  }
}
