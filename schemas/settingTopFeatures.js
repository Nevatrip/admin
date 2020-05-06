import FaListOl from 'react-icons/lib/fa/list-ol';

export default {
  name: 'settingTopFeatures',
  title: 'УТП',
  type: 'document',
  icon: FaListOl,
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
    {
      name: 'sort',
      title: 'Сортировка',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'icon'
    }
  }
}
