export default {
  name: 'promo',
  title: 'Акции',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название',
      type: 'string',
      required: true,
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text'
    },
    {
      name: 'promoCode',
      title: 'Промокод',
      type: 'array',
      of: [{ type: 'promoCode' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
