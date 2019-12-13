import FaCog from 'react-icons/lib/fa/cog';

export default {
  name: 'serviceBasedData',
  title: 'Служебные настройки',
  type: 'object',
  icon: FaCog,
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
      type: 'localeString',
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'localeString',
    },
    {
      name: 'articleTitle',
      title: 'Заголовок статьи "Об организации"',
      type: 'localeString',
    },
    {
      name: 'articleImage',
      title: 'Изображение в заголовке в статье "Об организации"',
      type: 'image',
    },
    {
      name: 'articleContent',
      title: 'Статья "Об организации"',
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
      name: 'currency',
      title: 'Знак валюта',
      type: 'localeString',
    },
    {
      name: 'copyright',
      title: '@ Копирайт',
      type: 'localeString',
    },
    {
      name: 'langSiteLink',
      title: 'Ссылка на соответствующую языковую версию сайта',
      description: 'Если ссылки нет, то и ссылок в шапке нет',
      type: 'localeString',
    },
    {
      name: 'filterTagsCaption',
      title: 'ФИЛЬТР: заголовок для тегов',
      description: 'Параметры прогулки',
      type: 'localeString',
    },
    {
      name: 'filterDayTimeCaption',
      title: 'ФИЛЬТР: заголовок для времени суток',
      description: 'Время суток',
      type: 'localeString',
    },
    {
      name: 'filterNoResult',
      title: 'ФИЛЬТР: нет результатов',
      description: 'Нет подходящих экскурсий',
      type: 'localeString',
    },


    {
      type: 'object',
      name: 'error',
      title: 'Страница ошибки',
      fieldsets: [
        {
          name: 'errorSettings',
          title: 'Настройки страницы ошибки',
          options: {collapsed: true}
        }
      ],
      fields: [
        {
          name: 'errorImage',
          title: 'Фото на странице ошибки',
          type: 'image',
          fieldset: 'errorSettings',
        },
        {
          name: 'errorTitle',
          title: 'Заголовок на странице ошибки',
          type: 'localeString',
          fieldset: 'errorSettings',
        },
        {
          name: 'errorContent',
          title: 'Основное содержимое на странице ошибки',
          type: 'localeText',
          fieldset: 'errorSettings',
        },
        {
          name: 'errorMoreLink',
          title: 'Ссылка посмотрите другие экскурсии на странице ошибки',
          description: 'Ведёт на главную',
          type: 'localeString',
          fieldset: 'errorSettings',
        },
        {
          name: 'errorInfoTitle',
          title: 'Заголовок блока инфо на странице ошибки',
          type: 'localeString',
          fieldset: 'errorSettings',
        },
        {
          name: 'errorInfoText',
          title: 'Содержимое блока инфо на странице ошибки',
          type: 'localeText',
          fieldset: 'errorSettings',
        },
      ]
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
    }
  }
}
