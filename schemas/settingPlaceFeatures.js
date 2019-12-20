import slugValidation from "../components/slugValidation";
import FaCoffee from 'react-icons/lib/fa/coffee';

export default {
  name: 'settingPlaceFeatures',
  title: 'Что есть на борту',
  type: 'document',
  icon: FaCoffee,
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
      description: 'Это ключ для программиста, должен быть человекопонятным. Если элементом является туалет, то ключ должен быть — wc',
      type: 'slug',
      required: true,
      validation: slugValidation,
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
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'icon'
    }
  }
}
