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
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'API',
              name: 'provider',
              type: 'reference',
              required: true,
              to: { type: 'apiProvider' }
            },
            {
              title: 'Значение',
              name: 'value',
              required: true,
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'provider.title',
              value: 'value'
            },
            prepare(selection) {
              const {title, value} = selection
              return {
                title: `${ title } — ${ value }`
              }
            }
          },
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name.current'
    }
  }
}
