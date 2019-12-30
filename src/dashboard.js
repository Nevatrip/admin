import React from 'react'
import SB from '@sanity/desk-tool/structure-builder'
import FaCog from 'react-icons/lib/fa/cog';
import FaCogs from 'react-icons/lib/fa/cogs';
import FaImage from 'react-icons/lib/fa/image';
import FaBook from 'react-icons/lib/fa/book';
import IoAndroidBoat from 'react-icons/lib/io/android-boat';
import MdEmail from 'react-icons/lib/md/email';
import MdShoppingCart from 'react-icons/lib/md/shopping-cart';

export default () =>
  SB.list()
    .id('root')
    .title('Панель управления')
    .items([
      SB.documentTypeListItem('tour'),
      SB.documentTypeListItem('blog'),
      //SB.documentTypeListItem('rent'),
      //SB.documentTypeListItem('promo'),
      SB.documentTypeListItem('page'),
      SB.listItem()
        .id('settings')
        .title('Settings')
        .icon(FaCogs)
        .child(
          SB.list()
            .title('Settings')
            .items([
              SB.documentTypeListItem('place'),
              SB.documentTypeListItem('point'),
              SB.documentTypeListItem('sight'),
              SB.documentTypeListItem('placeCategory'),
              SB.documentTypeListItem('ticketType'),
              SB.documentTypeListItem('apiProvider'),
              SB.documentTypeListItem('supportedLanguages'),
              SB.documentTypeListItem('settingTicketPrint'),
              SB.documentTypeListItem('settingServiceCategory'),
              SB.documentTypeListItem('settingServiceTag'),
              SB.documentTypeListItem('settingMenu'),
              SB.documentTypeListItem('settingPlaceFeatures'),
              SB.documentTypeListItem('settingSocials'),
              SB.documentTypeListItem('settingTourLanguages'),
              SB.documentTypeListItem('settingServicesCollections'),
              SB.documentTypeListItem('settingTopFeatures'),
              SB.documentTypeListItem('settingBottomFeatures'),
              SB.listItem()
                .id('settingMainBanner')
                .title('Баннер на главной')
                .icon(FaImage)
                .child(
                  SB.editor()
                    .id('config')
                    .title('Баннер на главной')
                    .schemaType("settingMainBanner")
                    .documentId("settingMainBanner")
                ),
              SB.listItem()
                .id('settingBlog')
                .title('Блог')
                .icon(FaBook)
                .child(
                  SB.editor()
                    .id('config')
                    .title('Блог')
                    .schemaType("settingBlog")
                    .documentId("settingBlog")
                ),
              SB.listItem()
                .id('settingService')
                .title('Настройки экскурсии')
                .icon(IoAndroidBoat)
                .child(
                  SB.editor()
                    .id('config')
                    .title('Настройки экскурсии')
                    .schemaType("settingService")
                    .documentId("settingService")
                ),
              SB.listItem()
                .id('settingEmails')
                .title('Настройки ПИСЕМ')
                .icon(MdEmail)
                .child(
                  SB.editor()
                    .id('config')
                    .title('Настройки ПИСЕМ')
                    .schemaType("settingEmails")
                    .documentId("settingEmails")
                ),
              SB.listItem()
                .id('settingCart')
                .title('Настройки КОРЗИНЫ')
                .icon(MdShoppingCart)
                .child(
                  SB.editor()
                    .id('config')
                    .title('Настройки КОРЗИНЫ')
                    .schemaType("settingCart")
                    .documentId("settingCart")
                ),
          ])
        ),
      SB.listItem()
        .id('serviceSettings')
        .title('Служебные настройки')
        .icon(FaCog)
        .child(
          SB.editor()
            .id('config')
            .schemaType("serviceBasedData")
            .documentId("serviceBasedData")
        ),
    ])
