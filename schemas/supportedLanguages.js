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
      validation: Rule => Rule.required(),
    },
    {
      name: 'key',
      title: 'Ключ',
      type: 'slug',
      required: true,
      validation: Rule => Rule.required(),
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
