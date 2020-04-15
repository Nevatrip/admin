import slugValidation from "../components/slugValidation";
import FaTicket from 'react-icons/lib/fa/ticket';

export default {
  name: 'ticketType',
  title: 'Тип билета',
  type: 'document',
  icon: FaTicket,
  fields: [
    {
      name: 'title',
      title: 'Тип билета',
      type: 'localeString'
    },
    {
      name: 'name',
      title: 'Ключ',
      description: 'Это ключ для программиста, должен быть человекопонятным. Если тип билета взрослый, то ключ должен быть — adult',
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
      title: 'Description',
      type: 'localeText'
    },
    {
      name: 'api',
      description: 'Поле для программиста',
      title: 'Значение в API партнёра',
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
