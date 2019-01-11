import FaLongArrowRight from 'react-icons/lib/fa/long-arrow-right'

function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

export default {
  name: 'direction',
  title: 'Одиночное направление',
  icon: FaLongArrowRight,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string'
    },
    {
      name: 'map',
      title: 'Карта',
      type: 'string'
    },
    {
      name: 'tickets',
      title: 'Билеты',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Категория',
              name: 'category',
              type: 'reference',
              required: true,
              to: { type: 'placeCategory' }
            },
            {
              title: 'Билет',
              name: 'ticket',
              type: 'array',
              required: true,
              description: 'Билет может быть одиночным, т. е. содержать один тип билета, или составным, например: «взрослый + взрослый + детский = „семейный“»',
              of: [
                {
                  title: 'Тип билета',
                  name: 'ticketType',
                  type: 'reference',
                  required: true,
                  to: { type: 'ticketType' }
                }
              ]
            },
            {
              title: 'Альтернативное имя',
              name: 'name',
              type: 'string'
            },
            {
              title: 'Стоимость',
              name: 'price',
              required: true,
              type: 'string'
            },
            {
              title: 'Количество',
              name: 'count',
              type: 'number'
            },
            {
              title: 'Альтернативное описание',
              name: 'description',
              type: 'text'
            },
            {
              name: 'additionalItem',
              title: 'Дополнительные услуги',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      title: 'Название',
                      name: 'name',
                      type: 'string'
                    },
                    {
                      title: 'Стоимость',
                      name: 'price',
                      type: 'number'
                    },
                    {
                      title: 'Описание',
                      name: 'description',
                      type: 'text'
                    },
                    {
                      name: 'api',
                      title: 'Значение в API партнёра',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              title: 'API',
                              name: 'provider',
                              type: 'reference',
                              to: { type: 'apiProvider' }
                            },
                            {
                              title: 'Значение',
                              name: 'value',
                              type: 'string',
                            },
                          ],
                          preview: {
                            select: {
                              title: 'provider.title',
                              value: 'value'
                            },
                            prepare(selection) {
                              const {title, value} = selection
                              return {
                                title: `${ title } — ${ value }`
                              }
                            }
                          },
                        }
                      ]
                    }
                  ]
                }
              ]
            },
          ],
          preview: {
            select: {
              name: 'name',
              price: 'price',
              description: 'description',
              category: 'category.title',
              ticket: 'ticket',
            },
            prepare(selection) {
              const { name, price, description, category, ticket } = selection
              return {
                title: `${ category }, ${ name ? name.toLowerCase() : ticket.length + ' ' + getNoun( ticket.length, 'билет', 'билета', 'билетов' ) } — ${ price } ₽`,
                subtitle: description
              }
            },
            // component: Ticket
          },
        }
      ]
    },
    {
      name: 'schedule',
      title: 'Расписание',
      type: 'schedule',
    }
  ],
}
