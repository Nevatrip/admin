export default {
  name: 'promoEntry',
  title: 'Назначение промокода',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Описание',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
