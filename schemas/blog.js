import slugValidation from "../components/slugValidation";
import FaBook from 'react-icons/lib/fa/book';

export default {
  name: 'blog',
  title: 'Блог',
  type: 'document',
  icon: FaBook,
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      required: true,
      description: 'Для экскурсий со старого сайта Ключ должен совпадать с полем "Псевдоним"',
    },
    {
      name: 'releaseDate',
      title: 'Дата создания статьи',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
      required: true,
      description: 'Дата создания статьи (можно выбрать любую дату)'
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
      name: 'description',
      title: 'Описание',
      description: 'Малый "надзаголовок" над заголвком экскурсии ( ПО КЛАССИКЕ )',
      type: 'localeString'
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
      name: 'content',
      title: 'Содержимое',
      description: 'Основной текст',
      type: 'localeMarkdown',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      titleImage: 'titleImage',
      previewImage: 'previewImage'
    },
    prepare(selection) {
      const { title, titleImage, previewImage } = selection;
      return {
        media: titleImage || previewImage,
        title: (title.ru || {}).name || (title.en || {}).name  || (title.de || {}).name  || (title.cs || {}).name || (title.zh || {}).name,
        subtitle: `${((title.ru || {}).key || {}).current ? 'ru ' : ''}${((title.en || {}).key||{}).current ? 'en ' : ''}${((title.de || {}).key||{}).current ? 'de ' : ''}${((title.cs || {}).key||{}).current ? 'cs ' : ''}${((title.zh || {}).key||{}).current ? 'zh ' : ''}`
      }
    }
  }
}
