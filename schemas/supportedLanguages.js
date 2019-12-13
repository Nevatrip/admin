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
