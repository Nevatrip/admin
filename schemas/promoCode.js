export default {
  name: 'promoCode',
  title: 'Промокод',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Название',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'value',
      title: 'Значение',
      type: 'number',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'type',
      title: 'Тип',
      type: 'reference',
      to: [{type: 'promoType'}],
    },
    {
      name: 'entry',
      title: 'К чему применяем',
      type: 'reference',
      to: [{type: 'promoEntry'}],
    },
    {
      name: 'expired',
      title: 'Срок действия',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        calendarTodayLabel: 'Сегодня'
      }
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text'
    },
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
