import slugValidation from "../components/slugValidation";
import FaSuitcase from 'react-icons/lib/fa/suitcase';

export default {
  name: 'apiProvider',
  title: 'Партнёры',
  type: 'document',
  icon: FaSuitcase,
  fields: [
    {
      name: 'title',
      title: 'Имя',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'key',
      title: 'Ключ',
      description: 'Является ключом для программиста, должен быть человекопонятным, если партнер Яндекс, то в ключе пишем — yandex',
      type: 'slug',
      required: true,
      validation: slugValidation,
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'partnerContract',
      title: '№ партнёрского договора',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email партнёра',
      type: 'string'
    },    
    {
      name: 'logo',
      title: 'Логотип',
      type: 'image'
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  }
}
