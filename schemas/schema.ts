// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import action from './action'
import apiProvider from './apiProvider'
import apiRelation from './apiRelation'
import direction from './direction'
import complex from './complex'
import event from './event'
import localeMarkdown from './localeMarkdown'
import localeString from './localeString'
import localeText from './localeText'
import localeTitleSlug from './localeTitleSlug'
import place from './place'
import placeCategory from './placeCategory'
import point from './point'
import settingPlaceFeatures from './settingPlaceFeatures'
import settingServiceCategory from './settingServiceCategory'
import settingServiceTag from './settingServiceTag'
import settingTicketPrint from './settingTicketPrint'
import settingTourLanguages from './settingTourLanguages'
import sight from './sight'
import ticket from './ticket'
import ticketType from './ticketType'
import tour from './tour'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    action,
    apiProvider,
    apiRelation,
    direction,
    complex,
    event,
    localeMarkdown,
    localeString,
    localeText,
    localeTitleSlug,
    place,
    placeCategory,
    point,
    settingPlaceFeatures,
    settingServiceCategory,
    settingServiceTag,
    settingTicketPrint,
    settingTourLanguages,
    sight,
    ticket,
    ticketType,
    tour,
  ])
})
