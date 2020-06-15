const langsMap = {
  ru: 'Русский',
  en: 'Английский',
  de: 'Немецкий',
  cs: 'Чешский',
  zh: 'Китайский',
}

const langsStr = process.env.SANITY_STUDIO_LANGS || 'ru';
const langsArr = langsStr.replace( / /g, '' ).split( ',' );
const defaultLang = langsArr[ 0 ];
const supportedLanguages = langsArr.map( ( id, index ) => ( {
  id,
  title: langsMap[ id ] || 'Unknown language',
  isDefault: !index,
} ) );

export { defaultLang }
export default supportedLanguages

