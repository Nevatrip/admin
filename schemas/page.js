import FaFileO from 'react-icons/lib/fa/file-o';

export default {
  name: 'page',
  title: 'Страница',
  type: 'document',
  icon: FaFileO,
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeTitleSlug',
      description: 'Для экскурсий со старого сайта Ключ должен совпадать с полем "Псевдоним"',
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
      title: 'Главное изображение',
      type: 'image',
      description: 'Настройка: "Edit", Центр круга: центр для превью, Черная область: область для показа на детальной',
      options: { hotspot: true },
    },
    {
      name: 'imagesGallery',
      title: 'Загрузить картинки',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'content',
      title: 'Содержимое',
      description: 'Основной текст',
      type: 'localeMarkdown'
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
