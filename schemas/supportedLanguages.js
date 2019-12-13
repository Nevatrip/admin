import slugValidation from "../components/slugValidation";
import FaFortAwesome from 'react-icons/lib/fa/language';

export default {
  name: 'supportedLanguages',
  title: 'Языки',
  type: 'document',
  icon: FaFortAwesome,
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
      description: 'Это ключ для программиста, должен быть человекопонятным и соответствовать ISO639-1. https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2',
      type: 'slug',
      required: true,
      validation: slugValidation,
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
