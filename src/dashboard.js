import React from 'react'
import SB from '@sanity/desk-tool/structure-builder'

export default () =>
  SB.list()
    .id('root')
    .title('Панель управления')
    .items([
      SB.documentTypeListItem('tour'),
      SB.documentTypeListItem('rent'),
      SB.documentTypeListItem('promo'),
      SB.documentTypeListItem('blog'),
      SB.listItem()
        .id('settings')
        .title('Настройки')
        .child(
          SB.list()
            .title('Настройки')
            .items([
              SB.documentTypeListItem('place'),
              SB.documentTypeListItem('point'),
              SB.documentTypeListItem('sight'),
              SB.documentTypeListItem('placeCategory'),
              SB.documentTypeListItem('ticketType'),
              SB.documentTypeListItem('apiProvider'),
              SB.documentTypeListItem('supportedLanguages'),
              SB.documentTypeListItem('settingTicketPrint'),
              SB.documentTypeListItem('page'),
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
                .child(
                  SB.editor()
                    .id('config')
                    .title('Настройки экскурсии')
                    .schemaType("settingService")
                    .documentId("settingService")
                ),
          ])
        ),
      SB.listItem()
        .id('serviceSettings')
        .title('Служебные настройки')
        .child(
          SB.editor()
            .id('config')
            .schemaType("serviceBasedData")
            .documentId("serviceBasedData")
        ),
    ])
