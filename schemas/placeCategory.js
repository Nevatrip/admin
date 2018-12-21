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
      title: 'Описание',
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
