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
      validation: Rule => Rule.required(),
    },
    {
      name: 'name',
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
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'api',
      description: 'Поле для программиста',
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
