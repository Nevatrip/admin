export default {
  name: 'settingServiceCategory',
  title: 'Категории экскурсий',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок краткий основной',
      description: 'Используется в меню сайта, в хлебных крошках',
      type: 'localeTitleSlug',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'subTitle',
      title: 'Подзаголовок',
      description: 'Используется в меню сайта',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'titleArticle',
      title: 'Заголовок на странице раздела',
      description: 'По умолчанию - это заголовок краткий основной',
      type: 'localeString',
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
      required: true,
    },
    {
      name: 'descriptionMeta',
      title: 'Описание для мета тегов',
      type: 'localeString',
      description: 'Краткое описание статьи для мета тегов',
      required: true,
    },
    {
      name: 'titleImage',
      title: 'Изображение в заголовке',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'title.ru.name',
      media: 'titleImage'
    }
  }
}
