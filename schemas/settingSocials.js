import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';

export default {
  name: 'settingSocials',
  title: 'Социальные сети',
  type: 'document',
  icon: FaFacebookOfficial,
  fields: [
    {
      name: 'title',
      title: 'Имя',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Ссылка',
      type: 'localeString',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Изображение',
      type: 'image',
      description: 'Должна быть квадратной 20px*20px белого или #e2b44e цвета',
      required: true,
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'icon'
    }
  }
}
