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
              SB.documentTypeListItem('settingTourLanguages'),
              SB.listItem()
                .id('settingService')
                .title('Настройки экскурсия')
                .child(
                  SB.editor()
                    .id('config')
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