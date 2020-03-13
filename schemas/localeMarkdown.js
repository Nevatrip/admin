import MarkdownInput from 'sanity-plugin-markdown' //!!!important don't remove otherwise you will see crash after save
import htmlPreview from 'sanity-plugin-markdown/html-preview' //!!!important don't remove otherwise you will see crash after save

// We need to solve the error problem. The error is displayed when switching between languages and input markdown.

const supportedLanguages = [
  {id: 'ru', title: 'Русский', isDefault: true},
  {id: 'en', title: 'Английский'},
  {id: 'de', title: 'Немецкий'},
  {id: 'cs', title: 'Чешский'},
  {id: 'zh', title: 'Китайский'}
];

export default {
  name: 'localeMarkdown',
  title: 'localeMarkdown',
  type: 'object',
  fieldsets: [
    {
      title: 'Переводы',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: supportedLanguages.map(lang => (
    {
      title: lang.title,
      name: lang.id,
      type: 'markdown',
      fieldset: lang.isDefault ? null : 'translations'
    }
  ))
}
