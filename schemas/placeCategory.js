export default {
  name: 'placeCategory',
  title: 'Категория места',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Категория места',
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
      title: 'Описание',
      type: 'text'
    },
    {
      name: 'api',
      title: 'Значение в API партнёра',
      description: 'Поле для программиста',
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
