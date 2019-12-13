import slugValidation from "../components/slugValidation";
import MdLanguage from 'react-icons/lib/md/language';

export default {
  name: 'settingTourLanguages',
  title: 'Языки экскурсии',
  type: 'document',
  icon: MdLanguage,
  fields: [
    {
      name: 'title',
      title: 'Название',
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
        source: 'title',
        maxLength: 2,
      }
    },
    {
      name: 'icon',
      title: 'Флаг',
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
