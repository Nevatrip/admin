export default {
  name: 'sight',
  title: 'Достопримечательность',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
      type: 'localeString',
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
        source: 'title.ru',
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'localeText'
    },
    {
      name: 'coords',
      title: 'Координаты',
      type: 'geopoint'
    },
    {
      name: 'image',
      title: 'Фотография',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'phone',
      title: 'Контакты',
      type: 'string'
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'logo'
    }
  }
}
