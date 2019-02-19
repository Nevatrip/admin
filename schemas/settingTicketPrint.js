import slugValidation from "../components/slugValidation";

export default {
  name: 'settingTicketPrint',
  title: 'Печать билета',
  type: 'document',
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
