import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import supportedLanguages from './supportedLanguages'
import apiProvider from './apiProvider'
import apiRelation from './apiRelation'
import ticketType from './ticketType'
import placeCategory from './placeCategory'
import point from './point'
import place from './place'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    supportedLanguages,
    apiProvider,
    apiRelation,
    ticketType,
    placeCategory,
    point,
    place,
  ])
})
