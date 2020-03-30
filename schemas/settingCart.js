export default {
  name: 'settingCart',
  title: 'Настройки КОРЗИНЫ',
  type: 'object',
  fields: [
    {
      name: 'cartBackground',
      title: 'Фон корзины',
      description: '«Изображение для фона для корзины»',
      type: 'image',
      options: { hotspot: true },
    }
  ],
  preview: {
    select: {
      title: 'Настройки КОРЗИНЫ',
    }
  }
}
