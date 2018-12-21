import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import supportedLanguages from './supportedLanguages'
import apiProvider from './apiProvider'
import apiRelation from './apiRelation'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    supportedLanguages,
    apiProvider,
    apiRelation,
  ])
})
