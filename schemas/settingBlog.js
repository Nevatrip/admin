export default {
  name: 'settingBlog',
  title: 'Блог',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Фото для обложки',
      type: 'image',
    },
    {
      name: 'logo',
      title: 'Лого на обложке',
      type: 'image',
    },
    {
      name: 'heading',
      title: 'Заголовок',
      type: 'localeString',
    },
    {
      name: 'intro',
      title: 'Текст под заголовком',
      type: 'localeText',
    },
    {
      name: 'sectionsCaption',
      title: 'Заголовок рубрикатора ( "Рубрикатор" )',
      type: 'localeString',
    },
    {
      name: 'sections',
      title: 'Показываем рубрики',
      type: 'localeString',//
    },
    {
      name: 'blogsCaption',
      title: 'Заголовок блога ( "Свеженькое" )',
      type: 'localeString',
    },
    {
      name: 'subscribeCaption',
      title: 'Заголовок подписки ( "Подпишись на нашу полезную рассылку" )',
      type: 'localeString',
    },
    {
      name: 'subscribeCode',
      title: 'Код формы подписки ( unisender )',
      type: 'localeText',
    },
    {
      name: 'blogsMore',
      title: 'Текст кнопки показать ещё ( "Все новости" )',
      type: 'localeString',
    },
    {
      name: 'blogsHint',
      title: 'Заголовок подсказываемых экскурсий ( "Вам могут быть интересны:" )',
      type: 'localeString',
    },
  ],
}
