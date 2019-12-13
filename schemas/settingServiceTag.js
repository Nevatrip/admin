import slugValidation from "../components/slugValidation";
import FaTags from 'react-icons/lib/fa/tags';

export default {
  name: 'settingServiceTag',
  title: 'Теги',
  type: 'document',
  icon: FaTags,
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'subTitle',
      title: 'Подзаголовок',
      type: 'localeString',
      required: true,
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
  ],
  preview: {
    select: {
      title: 'title.ru',
    }
  }
}
