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
  ],
  preview: {
    select: {
      title: 'Настройки экскурсия',
    }
  }
}