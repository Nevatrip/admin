import slugValidation from "../components/slugValidation";
import FaFortAwesome from 'react-icons/lib/fa/fort-awesome';

export default {
  name: 'sight',
  title: 'Достопримечательность',
  type: 'document',
  icon: FaFortAwesome,
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
      description: 'Это ключ для программиста, должен быть человекопонятным. Если достопримечательность планета, то ключ должен быть — planet',
      type: 'slug',
      validation: slugValidation,
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
