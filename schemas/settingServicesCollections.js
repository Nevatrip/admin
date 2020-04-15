import FaListAlt from 'react-icons/lib/fa/list-alt';

export default {
  name: 'settingServicesCollections',
  title: 'Подборки экскурсий',
  type: 'document',
  icon: FaListAlt,
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'titleMenu',
      title: 'Заголовок в Меню',
      description: 'Если не заполнено, то берется из главного заголовка выше',
      type: 'localeString',
      required: true,
    },
    {
      name: 'description',
      title: 'Описание',
      description: 'Основной текст, сюда нельзя добавлять заголовок h1',
      type: 'localeMarkdown',
    },
    {
      name: 'titleLong',
      title: 'Расширенный заголовок',
      type: 'localeString',
      description: 'Развернутый заголовок статьи для мета тегов',
    },
    {
      name: 'descriptionMeta',
      title: 'Описание для мета тегов',
      type: 'localeString',
      description: 'Краткое описание статьи для мета тегов',
    },
    {
      name: 'titleImage',
      title: 'Изображение в заголовке',
      type: 'image',
      description: 'Настройка: "Edit", Черная область: область для показа изображения',
      options: { hotspot: true },
    },
    {
      title: 'Подборка',
      name: 'services',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Статья',
          to: { type: 'tour' }
        }
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.ru.name',
      media: 'titleImage'
    }
  }
}
