import FaPercent from 'react-icons/lib/fa/percent';

export default {
  name: 'promo',
  title: 'Акции',
  type: 'document',
  icon: FaPercent,
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
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
