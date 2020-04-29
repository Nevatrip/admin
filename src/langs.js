const languages = process.env.SANITY_STUDIO_LANGS ? JSON.parse(process.env.SANITY_STUDIO_LANGS) : [''];

export default languages.map(lang => {
  let translate;

  switch (lang) {
    case 'ru':
      translate = 'Русский';
      break;
    case 'en':
      translate = 'Английский';
      break;
    case 'de':
      translate = 'Немецкий';
      break;
    case 'cs':
      translate = 'Чешский';
      break;
    case 'zh':
      translate = 'Китайский';
      break;
    default:
      lang = 'ru';
      translate = 'Русский';
  }

  return {id: lang, title: translate};
});