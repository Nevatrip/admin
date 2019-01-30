export default {
  name: 'point',
  title: 'Причал/остановка/достопримечательность',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Имя',
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
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text'
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
      title: 'title',
      media: 'logo'
    }
  }
}
