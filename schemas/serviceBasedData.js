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
      name: 'titleMeta',
      title: 'Title для главной страницы для метатегов',
      description: 'Желательно, чтобы название компании в нем тоже присутствовало',
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
      name: 'logoSm',
      title: 'Лого на мобильных',
      description: 'На мобильных слоган в шапке сайта скрыт, поэтому предполагается, что лого для каждого языка будет включать в себя слоган',
      type: 'localeImage',
    },
    {
      name: 'Slogan',
      title: 'Слоган',
      description: 'Отображается в шапке сайта',
      type: 'localeString',
    },
    {
      name: 'Country',
      title: 'Страна каждого языка для локализации',
      description: 'В формате Alpha-2 iso 3166-1 https://ru.wikipedia.org/wiki/ISO_3166-1 заглавными буквами, например: RU или US или GB или CZ или DE или CN',
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
      name: 'priceCurrency',
      title: 'Валюта (в 3-х буквенном формате ISO 4217 ) цены предложения. ( RUB, EUR, ... )',
      type: 'string',
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
      name: 'sitemap',
      title: 'SITEMAP',
      fieldsets: [
        {
          name: 'sitemapSettings',
          title: 'Настройки страницы карты сайта',
          options: {collapsed: true}
        }
      ],
      fields: [
        {
          name: 'sitemapImage',
          title: 'Фото на странице карты сайта',
          type: 'image',
          fieldset: 'sitemapSettings',
        },
        {
          name: 'sitemapTitle',
          title: 'Заголовок на странице карты сайта',
          type: 'localeString',
          fieldset: 'sitemapSettings',
        }
      ]
    },
    {
      name: 'moreText',
      title: 'Заголовок для кнопки Еще',
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
    {
      name: 'counters',
      title: 'Счётчики',
      type: 'object',
      fields: [
        {
          name: 'yandexCounter',
          title: 'Счётчик для Яндекс',
          type: 'text',
        },
        {
          name: 'googleCounter',
          title: 'Счётчик для Google',
          type: 'text',
        },
        {
          name: 'altCounters',
          title: 'Альтернативные счётчики',
          type: 'text',
        },
        {
          name: 'pixelForSocials',
          title: 'Пиксель для социальных сетей',
          type: 'text',
        },
        {
          name: 'metatags',
          title: 'Мета-теги (будут вставлены в тег <head>)',
          type: 'localeText',
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title.ru',
    }
  }
}
