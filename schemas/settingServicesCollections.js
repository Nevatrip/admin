export default {
  name: 'settingServicesCollections',
  title: 'Подборки экскурсий',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      required: true,
      validation: Rule => Rule.required(),
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