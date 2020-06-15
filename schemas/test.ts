import sanityClient from '@sanity/client'
import { builder as tourBuilder } from './tour'

const [ query, type ] = tourBuilder
  // .map( h => ( {
  //   title: h.title[ 'ru' ][ 'name' ].use(),
  //   key: h.title[ 'ru' ][ 'key' ][ 'current' ].use(),
  //   // directions: h.directions.pick( [ '_type', 'title', 'tickets' ] ).use(),
  // } ) )
  .pick( [ '_id', 'title', 'directions' ] )
  .first()
  .use()

console.log( ``,  )
console.log( `query`, query )
console.log( ``,  )
console.log( ``,  )

const projectId = {
  ANYTRIP: 'ki4to3sz',
  PRAHATRIP: 's4ma4zok',
  NEVATRIP: '39dycnz5',
  MOSKVATRIP: 'aybxlzaz',
}

const client = sanityClient({
  projectId: projectId.ANYTRIP,
  dataset: 'production',
  useCdn: true,
});


( async () => {
  const result = await client.fetch<typeof type>( query )
  const [ direction ] = result.directions

  if (direction._type === 'direction') {
    console.log( `direction.point`, direction.point );
  }
} )()