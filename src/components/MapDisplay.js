import React from 'react'
import { venueLocationData, venueCount } from '../helper-functions/venueLocationData'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


const MapDisplay = withGoogleMap(({ searchResults }) => {

  let mapCenter = { lat:40 , lng: -100 }
  let zoomIndex = 4
  if(searchResults.length!==0){
    const sortedSearch = searchResults.sort( (venueA, venueB) => {
      return venueB.cityVenues.length - venueA.cityVenues.length
    })
    console.log(sortedSearch);
    zoomIndex = 6
    mapCenter = {lat:sortedSearch[0].Latitude , lng: sortedSearch[0].Longitude }
  };

  // const searchLocation = searchResults.filter( venue => {
  //   const total = searchResults.reduce( (num, eachLocation) => {
  //     return eachLocation.count > num ? num = eachLocation.count : num
  //     // return num
  //   }, 0)
  //   if(venue.count === total){
  //     return venue
  //   }
  // })
  const venuePins = Object.keys(venueCount).map((location, index) => {
    const pin = Object.keys(venueCount[location]).map((city, i) => {
      let cityInfo = venueCount[location][city]
      let Latitude = cityInfo.lat
      let Longitude = cityInfo.long
      if(Latitude !== '' && Longitude !== ''){
      return <Marker
                key={i}
                position={{lat: Latitude , lng: Longitude}}
                label={cityInfo.count.toString()}
              />
      } else {
        return null
      }
    })
    return pin
  })

  // <InfoWindow onCloseClick={()=> clickInfoBox(claim)}>
  //                   <div>
  //                     <div>{sightings[claim].summary}</div>
  //                     <a href={sightings[claim].url} target='_blank'>{'Read More'}</a>
  //                 </div>
  //                 </InfoWindow>

  return (
    <div id='map-container'>
    <GoogleMap
      zoom={zoomIndex}
      center={mapCenter}>
      {venuePins}
    </GoogleMap>
  </div>
  )
})

export default MapDisplay