const supportedLanguages = JSON.parse(process.env.SANITY_STUDIO_LANGS);

export default {
  name: 'localeTitleSlug',
  title: 'localeTitleSlug',
  type: 'object',
  fieldsets: [
    {
      title: 'Переводы',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: supportedLanguages.map(lang => (
    {
      title: lang.title,
      name: lang.id,
      type: 'object',
      fieldset: lang.isDefault ? null : 'translations',
      fields: [
        {
          title: 'Заголовок',
          name: 'name',
          type: 'string',
        },
        {
          title: 'Ключ',
          description: 'Это часть урла. Это человекопонятное название экскурсии, которое используется в урле. Если название экскурсии "Слон", то ключ должен быть — slon. Если ключ не заполнен, то страница не отобразится на этом языке',
          name: 'key',
          type: 'slug',
          validation: Rule => Rule.custom(slug => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current) || 'Ключ должен быть в нижнем регистре, не содержать пробелов и радовать глаз, блеать! Нажми на кнопку Generate и не парься…'),
          options: {
            source: options => ((typeof options.title !== 'undefined')&&(typeof options.title[lang.id] !== 'undefined')) ? `${options.title[lang.id].name}` : '',
            maxLength: 96,
          }
        }
      ]
    }
  ))
}