import FaFileO from 'react-icons/lib/fa/file-o';

export default {
  name: 'page',
  title: 'Страницы',
  type: 'document',
  icon: FaFileO,
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'titleLong',
      title: 'Расширенный заголовок',
      type: 'localeString',
      required: true,
    },
  ],
  preview: {
    select: {
      title: 'title.ru.name',
      media: 'logo'
    }
  }
}
