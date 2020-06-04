import MdLink from 'react-icons/lib/md/insert-link';
import supportedLanguages from '../src/langs';

export default {
  icon: MdLink,
  name: 'localeLink',
  title: 'localeLink',
  type: 'object',
  fieldsets: [
    {
      title: 'Переводы',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: supportedLanguages.map( lang => (
    {
      title: lang.title,
      name: lang.id,
      type: 'object',
      fieldset: lang.isDefault ? null : 'translations',
      fields: [
        {
          name: 'title',
          title: 'Заголовок',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Ссылка',
          type: 'string'
        },
      ],
    }
  )),
  preview: {
    select: {
      title: 'ru.title'
    }
  }
}
