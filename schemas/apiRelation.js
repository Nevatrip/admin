export default {
  name: 'apiRelation',
  title: 'Значение в API партнёра',
  description: 'Поле для программиста',
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