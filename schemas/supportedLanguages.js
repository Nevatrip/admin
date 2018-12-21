export default {
  name: 'supportedLanguages',
  title: 'Языки',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
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
        maxLength: 2,
      }
    },
    {
      name: 'isDefault',
      title: 'Язык по умолчанию',
      type: 'boolean',
    }
  ],
}
