import MarkdownInput from 'sanity-plugin-markdown' //!!!important don't remove otherwise you will see crash after save
import htmlPreview from 'sanity-plugin-markdown/html-preview' //!!!important don't remove otherwise you will see crash after save

// We need to solve the error problem. The error is displayed when switching between languages and input markdown.

const supportedLanguages = JSON.parse(process.env.SANITY_STUDIO_LANGS);

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
