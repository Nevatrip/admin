import slugValidation from "../components/slugValidation";
import FaPiedPiperAlt from 'react-icons/lib/fa/pied-piper-alt';

export default {
  name: 'placeCategory',
  title: 'Категория места',
  type: 'document',
  icon: FaPiedPiperAlt,
  fields: [
    {
      name: 'title',
      title: 'Категория места',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'name',
      title: 'Ключ',
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
    {
      name: 'api',
      title: 'Значение в API партнёра',
      description: 'Поле для программиста',
      type: 'apiRelation'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name.current'
    }
  }
}
