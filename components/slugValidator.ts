export default Rule => Rule
  .required()
  .custom( slug => 
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test( slug.current ) ||
    'Ключ должен быть в нижнем регистре, не содержать пробелов и радовать глаз, блеать! Нажми на кнопку Generate и не парься…'
  );