export default {
  name: 'settingService',
  title: 'Настройки экскурсия',
  type: 'object',
  fields: [
    {
      name: 'serviceBuyLink',
      title: 'Купить',
      description: 'Кнопка \'купить\'',
      type: 'localeString',
    },
    {
      name: 'serviceDescriptionDuration',
      title: 'Длительность',
      description: 'В списке на детальной',
      type: 'localeString',
    },
    {
      name: 'serviceDescriptionTime',
      title: 'Расписание',
      description: 'В списке на детальной',
      type: 'localeString',
    },
    {
      name: 'serviceDescriptionFromPoint',
      title: 'Отправление',
      description: 'В списке на детальной',
      type: 'localeString',
    },
    {
      name: 'serviceDescriptionVehicle',
      title: 'Транспортное средство',
      description: 'В списке на детальной',
      type: 'localeString',
    },
    {
      name: 'serviceDescriptionExcursion',
      title: 'Язык экскурсии',
      description: 'В списке на детальной',
      type: 'localeString',
    },
    {
      name: 'serviceDescriptionPlaceFeatures',
      title: 'На борту',
      description: 'В списке на детальной',
      type: 'localeString',
    },
    {
      name: 'serviceDescriptionRouteMap',
      title: 'Посмотреть маршрут прогулки',
      description: 'В списке на детальной',
      type: 'localeString',
    },
    {
      name: 'serviceMoreLink',
      title: 'Подробнее об экскурсии',
      description: 'Ссылка в баннере',
      type: 'localeString',
    },
    {
      name: 'servicePriceOutside',
      title: 'На причале',
      description: 'Текст рядом с ценой на причале',
      type: 'localeString',
    },
    {
      name: 'serviceViewListItemLgMore',
      title: 'Подробнее',
      description: 'В превью в списке по категориям',
      type: 'localeString',
    },
    {
      name: 'serviceViewDetailDescription',
      title: 'Об экскурсии',
      description: 'Заголовок на детальной странице',
      type: 'localeString',
    },
    {
      name: 'serviceViewDetailRouteMap',
      title: 'Карта маршрута',
      description: 'Заголовок на детальной странице',
      type: 'localeString',
    },
    {
      name: 'serviceViewDetailAdvice',
      title: 'Совет от организатора',
      description: 'Заголовок на детальной странице',
      type: 'localeString',
    },
    {
      name: 'serviceViewDetailGallery',
      title: 'Галерея',
      description: 'Заголовок на детальной странице',
      type: 'localeString',
    },
    {
      name: 'serviceViewDetailAttractions',
      title: 'Вы увидите',
      description: 'Заголовок на детальной странице',
      type: 'localeString',
    },
    {
      name: 'serviceViewDetailSame',
      title: 'Похожие экскурсии',
      description: 'Заголовок на детальной странице',
      type: 'localeString',
    },
    {
      name: 'servicePriceInfo',
      title: 'Скидки',
      description: 'Заголовок на детальной странице',
      type: 'localeString',
    },
    {
      type: 'array',
      name: 'popup',
      title: 'Всплывающие окна',
      description: 'Содержимое пункта скидки на детальной странице',
      of: [
        {
          name: 'popupItem',
          type: 'object',
          fields: [
            {
              name: 'popupAliasWrap',
              type: 'object',
              fields: [
                {
                  name: 'popupAlias',
                  title: 'Имя',
                  description: 'Будет использоваться в заполнении экскурсии в разделе',
                  type: 'string',
                },
              ]
            },
            {
              name: 'popupTitle',
              title: 'Имя в тексте',
              type: 'localeString',
            },
            {
              name: 'popupContent',
              title: 'Содержимое всплывающего окна',
              type: 'localeText',
            }
          ]
        },

      ],
    }
  ],
  preview: {
    select: {
      title: 'Настройки экскурсия',
    }
  }
}