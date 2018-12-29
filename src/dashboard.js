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
              SB.documentTypeListItem('placeCategory'),
              SB.documentTypeListItem('ticketType'),
              SB.documentTypeListItem('apiProvider'),
              SB.documentTypeListItem('supportedLanguages'),
          ])
        ),
    ])