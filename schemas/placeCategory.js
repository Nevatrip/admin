import slugValidation from "../components/slugValidation";
import FaPiedPiperAlt from 'react-icons/lib/fa/pied-piper-alt';

export default {
  name: 'placeCategory',
  title: 'Категория места',
  type: 'document',
  icon: FaPiedPiperAlt,
  fields: [
    {
      name: 'title',
      title: 'Категория места',
      type: 'localeString'
    },
    {
      name: 'name',
      title: 'Ключ',
      description: 'Это ключ для программиста, должен быть человекопонятным. Если категория места ВИП, то ключ должен быть — vip',
      type: 'slug',
      required: true,
      validation: slugValidation,
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'localeText'
    },
    {
      name: 'api',
      title: 'Значение в API партнёра',
      description: 'Поле для программиста',
      type: 'apiRelation'
    }
  ],
  preview: {
    select: {
      title: 'title.ru',
      subtitle: 'name.current'
    }
  }
}
