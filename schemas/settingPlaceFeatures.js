export default {
  name: 'settingPlaceFeatures',
  title: 'Что есть на борту',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
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
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'string',
      required: true,
    },
    {
      name: 'icon',
      title: 'Изображение',
      type: 'image',
      required: true,
    },
  ],
}
