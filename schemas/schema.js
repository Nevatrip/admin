import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import supportedLanguages from './supportedLanguages'
import localeString from './localeString'
import localeMarkdown from './localeMarkdown'
import localeTitleSlug from './localeTitleSlug'
import localeText from './localeText'
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
import settingSocials from './settingSocials'
import settingPlaceFeatures from './settingPlaceFeatures'
import settingMenu from './settingMenu'
import page from './page'
import settingTourLanguages from './settingTourLanguages'
import serviceBasedData from './serviceBasedData'
import settingService from './settingService'
import sight from './sight'
import settingServicesCollections from './settingServicesCollections'
import ticket from './ticket'
import settingMainBanner from './settingMainBanner'
import localeBanner from './localeBanner'
import settingTopFeatures from './settingTopFeatures'
import settingBottomFeatures from './settingBottomFeatures'
import settingBlog from './settingBlog'
import settingEmails from './settingEmails'
import settingCart from './settingCart'
import event from "./event";
import action from "./action";

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    supportedLanguages,
    localeString,
    localeMarkdown,
    localeTitleSlug,
    localeText,
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
    settingSocials,
    settingPlaceFeatures,
    page,
    settingTourLanguages,
    serviceBasedData,
    settingService,
    sight,
    settingServicesCollections,
    ticket,
    settingMainBanner,
    localeBanner,
    settingTopFeatures,
    settingBottomFeatures,
    settingBlog,
    settingEmails,
    settingCart,
    event,
    action,
  ])
})
