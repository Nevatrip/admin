import slugValidation from "../components/slugValidation";

export default {
  name: 'blog',
  title: 'Блог',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      required: true,
      description: 'Для экскурсий со старого сайта Ключ должен совпадать с полем "Псевдоним"',
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
      name: 'status',
      title: 'Статус',
      type: 'array',
      of: [ { type: 'string' } ],
      options: {
        list: [
          { title: 'Не показывать в списке категории', value: 'hidden' },
          { title: 'Снять с публикации', value: 'deleted' },
        ]
      }
    },
    {
      name: 'titleImage',
      title: 'Главное изображение',
      type: 'image',
      description: 'Настройка: "Edit", Центр круга: центр для превью, Черная область: область для показа на детальной',
      options: { hotspot: true },
    },
    {
      name: 'previewImage',
      title: 'Изображение для превью',
      type: 'image',
      description: 'Если не загружено, то оно берется из центра круга главного изображения выше',
    },
    {
      name: 'description',
      title: 'Описание',
      description: 'Основной текст, сюда нельзя добавлять заголовок h1',
      type: 'localeMarkdown',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.ru.name',
      media: 'titleImage'
    }
  }
}
