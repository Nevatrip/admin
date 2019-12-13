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
