export default {
  name: 'apiRelation',
  title: 'Значение в API партнёра',
  type: 'object',
  fields: [
    {
      title: 'API',
      name: 'api',
      type: 'reference',
      to: { type: 'apiProvider' }
    },
    {
      title: 'Значение',
      name: 'value',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'api.title',
      value: 'value'
    },
    prepare(selection) {
      const {title, value} = selection
      return {
        title: `${ title } — ${ value }`
      }
    }
  }
}
