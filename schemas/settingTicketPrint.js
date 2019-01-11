export default {
  name: 'settingTicketPrint',
  title: 'Печать билета',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Значение',
      type: 'string',
      required: true,
    },
    {
      name: 'key',
      title: 'Ключ',
      type: 'slug',
      required: true,
      options: {
        source: 'title',
        maxLength: 96
      }
    },
  ],
}
