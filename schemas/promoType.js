export default {
  name: 'promoType',
  title: 'Тип промокода',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название',
      type: 'string',
      required: true,
    },
    {
      name: 'title',
      title: 'Описание',
      type: 'string',
      required: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
