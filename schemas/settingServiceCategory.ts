import { defineDocument } from 'sanity-typed-queries'
import { defaultLang } from '../src/langs'
import FaLifeBouy from 'react-icons/lib/fa/life-bouy'
import { localeString } from './localeString'
import { localeTitleSlug } from './localeTitleSlug'
import { localeMarkdown } from './localeMarkdown'

const { settingServiceCategory, document, builder } = defineDocument( 'settingServiceCategory', {
  title: {
    type: 'localeTitleSlug',
    title: 'Заголовок краткий основной',
    description: 'Используется в меню сайта, в хлебных крошках',
    validation: Rule => Rule.required(),
  },
  subTitle: {
    type: 'localeString',
    title: 'Подзаголовок',
    description: 'Используется в меню сайта',
  },
  titleArticle: {
    type: 'localeString',
    title: 'Заголовок на странице раздела',
    description: 'По умолчанию - это заголовок краткий основной',
  },
  description: {
    type: 'localeMarkdown',
    title: 'Описание',
    description: 'Основной текст, сюда нельзя добавлять заголовок h1',
  },
  titleLong: {
    type: 'localeString',
    title: 'Расширенный заголовок',
    description: 'Развернутый заголовок статьи для мета тегов',
  },
  descriptionMeta: {
    type: 'localeString',
    title: 'Описание для мета тегов',
    description: 'Краткое описание статьи для мета тегов',
  },
  titleImage: {
    type: 'image',
    title: 'Изображение в заголовке',
  },
}, [
  localeString,
  localeTitleSlug,
  localeMarkdown,
] )

document.title = 'Категории экскурсий'
document.icon = FaLifeBouy
document.preview = {
  select: {
    title: `title.${ defaultLang }.name`,
    media: 'titleImage',
  }
}

export { builder, settingServiceCategory }
export default document