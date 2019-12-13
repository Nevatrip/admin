import slugValidation from "../components/slugValidation";
import FaMapMarker from 'react-icons/lib/fa/map-marker';

export default {
  name: 'point',
  title: 'Причал/Остановка',
  type: 'document',
  icon: FaMapMarker,
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
