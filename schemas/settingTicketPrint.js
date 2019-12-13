import slugValidation from "../components/slugValidation";
import FaPrint from 'react-icons/lib/fa/print';

export default {
  name: 'settingTicketPrint',
  title: 'Печать билета',
  type: 'document',
  icon: FaPrint,
  fields: [
    {
      name: 'title',
      title: 'Значение',
      type: 'string',
      required: true,
      validation: Rule => Rule.required(),
    },
    {
      name: 'key',
      title: 'Ключ',
      type: 'slug',
      required: true,
      validation: slugValidation,
      options: {
        source: 'title',
        maxLength: 96
      }
    },
  ],
}
