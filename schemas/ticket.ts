import { defineObject } from 'sanity-typed-queries'
import { defaultLang } from '../src/langs'
import { localeString } from './localeString'
import { apiRelation } from './apiRelation'
import { placeCategory } from './placeCategory'
import { ticketType } from './ticketType'
import { additionalItem } from './additionalItem'

function getNoun( number: number, one: string, two: string, five: string ): string {
  let n = Math.abs( number );
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

const { ticket, object } = defineObject( 'ticket', {
  category: {
    type: 'reference',
    title: 'Категория',
    validation: Rule => Rule.required(),
    to: [ { type: 'placeCategory' } ],
  },
  ticket: {
    type: 'array',
    title: 'Билет',
    validation: Rule => Rule.required(),
    description: 'Билет может быть одиночным, т. е. содержать один тип билета, или составным, например: «взрослый + взрослый + детский = „семейный“»',
    of: [
      {
        name: 'ticketType',
        type: 'reference',
        title: 'Тип билета',
        validation: Rule => Rule.required(),
        to: [ { type: 'ticketType' } ],
      }
    ]
  },
  name: {
    type: 'localeString',
    title: 'Альтернативное имя',
    description: 'Название будет использовано в билете, если оно заполнено'
  },
  price: {
    type: 'string',
    title: 'Стоимость',
    validation: Rule => Rule.required(),
  },
  count: {
    type: 'number',
    title: 'Количество',
    description: 'Это «сколько билетов должно отображаться на странице покупки». Обычно там будет 0, только для «Взрослый» — 1, чтобы был выбран хотя бы один билет при покупке. Но если у какой-то экскурсии нет «Взрослых» билетов, то лучше поставить единицу для какого-то другого набора билетов.'
  },
  description: {
    type: 'text',
    title: 'Альтернативное описание',
  },
  additionalItem: {
    type: 'array',
    title: 'Дополнительные услуги',
    of: [ { type: 'additionalItem' } ]
  },
}, [
  placeCategory,
  ticketType,
  localeString,
  additionalItem,
] )

object.title = 'Билет'
object.preview = {
  select: {
    name: 'name',
    nameRu: `name.${ defaultLang }`,
    price: 'price',
    description: 'description',
    category: `category.title.${ defaultLang }`,
    ticket: 'ticket',
  },
  prepare(selection) {
    const { name, price, description, category, ticket, nameRu } = selection;

    return {
      title: `${ category }, ${ name ? nameRu : ticket.length + ' ' + getNoun( ticket.length, 'билет', 'билета', 'билетов' ) } — ${ price } ₽`,
      subtitle: description
    }
  },
}

export { ticket }
export default object