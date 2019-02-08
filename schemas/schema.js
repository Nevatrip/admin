import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import supportedLanguages from './supportedLanguages'
import localeString from './localeString'
import localeTitleSlug from './localeTitleSlug'
import apiProvider from './apiProvider'
import apiRelation from './apiRelation'
import ticketType from './ticketType'
import placeCategory from './placeCategory'
import point from './point'
import place from './place'
import promo from './promo'
import promoType from './promoType'
import promoEntry from './promoEntry'
import promoCode from './promoCode'
import blog from './blog'
import tour from './tour'
import rent from './rent'
import direction from './direction'
import schedule from './schedule'
import settingTicketPrint from './settingTicketPrint'
import settingServiceCategory from './settingServiceCategory'
import settingServiceTag from './settingServiceTag'
import settingPlaceFeatures from './settingPlaceFeatures'
import settingMenu from './settingMenu'
import page from './page'
import event from './event'
import settingTourLanguages from './settingTourLanguages'
import serviceBasedData from './serviceBasedData'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    supportedLanguages,
    localeString,
    localeTitleSlug,
    apiProvider,
    apiRelation,
    ticketType,
    placeCategory,
    point,
    place,
    promo,
    promoType,
    promoEntry,
    promoCode,
    blog,
    tour,
    rent,
    direction,
    schedule,
    settingTicketPrint,
    settingServiceCategory,
    settingServiceTag,
    settingMenu,
    settingPlaceFeatures,
    page,
    event,
    settingTourLanguages,
    serviceBasedData,
  ])
})
