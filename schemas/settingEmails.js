export default {
  name: 'settingEmails',
  title: 'Настройки ПИСЕМ',
  type: 'object',
  fields: [
    {
      name: 'serviceBuyLink',
      title: 'Заголовок письма',
      description: '«Электронный билет»',
      type: 'localeString',
    }
  ],
  preview: {
    select: {
      title: 'Настройки ПИСЕМ',
    }
  }
}
