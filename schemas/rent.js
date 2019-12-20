import slugValidation from "../components/slugValidation";
import FaEmpire from 'react-icons/lib/fa/empire';

export default {
  name: 'rent',
  title: 'Аренда',
  type: 'document',
  icon: FaEmpire,
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
      description: 'Это ключ для программиста, должен быть человекопонятным. Используется в урле. Если транспортное аренда автобуса, то ключ должен быть — bus',
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
      type: 'text'
    },
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
