import FaTrophy from 'react-icons/lib/fa/trophy';

export default {
  name: 'settingBottomFeatures',
  title: 'Преимущества в разделе "о нас" на главной',
  type: 'document',
  icon: FaTrophy,
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Описание',
      description: 'Краткое',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Ссылка',
      type: 'localeString',
    },
    {
      name: 'icon',
      title: 'Иконка',
      description: 'Должна быть квадратной ориентировочно 60px*60px - 70px*70px. #4897c2 цвета',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'icon'
    }
  }
}
