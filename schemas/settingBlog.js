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
      description: 'Нажмите «Try», если после попытки опубликовать изменения, у вас появится окно с ошибкой. Не переживайте, изменения успешно опубликуются.',
      type: 'localeMarkdown',
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
    {
      name: 'subscribeCaptionDetail',
      title: 'Заголовок для подписки на детальной ( "Подписка на рассылку" )',
      type: 'localeString',
    },
    {
      name: 'socialCaptionDetail',
      title: 'Заголовок соц.сетей на детальной ( "Мы в социальных сетях:" )',
      type: 'localeString',
    },
    {
      name: 'hintCaptionDetail',
      title: 'Заголовок соц.сетей на детальной ( "Полезные статьи:" )',
      type: 'localeString',
    },
    {
      name: 'partnersCode',
      title: 'Код партнеров на детальной ( "поиск от aviasales" )',
      type: 'localeText',
    },
  ],
}
