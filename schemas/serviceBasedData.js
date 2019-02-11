export default {
  name: 'serviceBasedData',
  title: 'Служебная информация',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Имя организации',
      type: 'localeString',
    },
    {
      name: 'shortDescription',
      title: 'Краткое описание организации',
      description: 'Для метатегов',
      type: 'localeText',
    },
    {
      name: 'favicon',
      title: 'Фавиконка',
      type: 'image',
    },
    {
      name: 'logo',
      title: 'Лого',
      type: 'image',
    },
    {
      name: 'Slogan',
      title: 'Слоган',
      description: 'Отображается в шапке сайта',
      type: 'localeString',
    },
    // {
    //   name: 'languages',
    //   title: 'Языки',
      // type: 'array',
      // of: [
      //   {
      //     type: 'reference',
      //     title: 'Язык',
      //     to: {type: 'settingTourLanguages'}
      //   }
      // ]
    // },
    {
      name: 'tel',
      title: 'Номер телефона',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
    },
    // {
      // name: 'social',
      // title: 'Социальные сети',
      // type: 'array',
      // of: [
      //
      // ]
    // },
    // {
      // name: 'banner',
      // title: 'Баннер',
      // type: 'array',
      // of: [
      //   {
      //     type: 'reference',
      //     title: 'Экскурсии',
      //     to: {type: 'tour'}
      //   }
      // ]
    // },
    // {
    //   name: 'featuresTop',
    //   title: 'Характеристики на главной после баннера',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       title: 'Характеристики',
    //       to: {type: 'features'}
    //     }
    //   ]
    // },
    {
      name: 'articleTitle',
      title: 'Заголовок статьи "Об оргазизации"',
      type: 'localeString',
    },
    {
      name: 'articleImage',
      title: 'Изображение в заголовке в статье "Об оргазизации"',
      type: 'image',
    },
    // {
    //   name: 'articleFeatures',
    //   title: 'Характеристики после загаловка в статье "Об оргазизации"',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       title: 'Характеристики',
    //       to: {type: 'features'}
    //     }
    //   ]
    // },
    {
      name: 'articleContent',
      title: 'Статья "Об оргазизации"',
      type: 'localeText',
    },
    {
      name: 'awards',
      title: 'Награды',
      description: 'Раделять единичным переносм строки, расположены в футере',
      type: 'localeText',
    },
    {
      name: 'footerCategoryTitle',
      title: 'Заголовок для подборок в футере',
      type: 'localeString',
    },
    {
      name: 'copyright',
      title: '@ Копирайт',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'releaseDate'
    }
  }
}