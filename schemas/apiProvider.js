export default {
  name: 'apiProvider',
  title: 'Партнёры',
  type: 'document',
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
      type: 'slug',
      required: true,
      validation: Rule => Rule.required(),
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
