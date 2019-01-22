export default {
  name: 'settingTourLanguages',
  title: 'Языки экскурсии',
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
      name: 'icon',
      title: 'Флаг',
      type: 'image',
      required: true,
    },
  ],
}
