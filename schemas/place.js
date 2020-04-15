import slugValidation from "../components/slugValidation";
import FaTruck from 'react-icons/lib/fa/truck';

export default {
  name: 'place',
  title: 'Транспортное средство/площадка',
  type: 'document',
  icon: FaTruck,
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
      description: 'Это ключ для программиста, должен быть человекопонятным. Если транспортное средство автобус, то ключ должен быть — bus',
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
      name: 'api',
      title: 'Значение в API партнёра',
      type: 'apiRelation'
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'logo'
    }
  }
}
