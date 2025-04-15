

const cors = require("cors")



// export async function nearbySearch(lat: number, lng: number) {
//   const apiKey = 'AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c'; // Don't hardcode in production
//   const radius = 500; // meters
//   const type = 'restaurant';

//   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

//   try {
//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.results && data.results.length > 0) {
//           console.log(data.results);
//           return data.results;
//       } else {
//           console.log("No results");
//           return [];
//       }
//   } catch (err) {
//       console.error("Places API error:", err);
//       return [];
//   }
// }
let map;
export async function nearbySearch(lat, long) {
    //@ts-ignore
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // Restrict within the map viewport.
    let center = new google.maps.LatLng(lat, long);

    const request = {
        // required parameters
        fields: ['displayName', 'location', 'businessStatus'],
        locationRestriction: {
            center: center,
            radius: 500, 
        },
        // optional parameters
        includedPrimaryTypes: ['restaurant'],
        maxResultCount: 5,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
        language: 'en-US',
        region: 'us',
    };

    //@ts-ignore
    const { places } = await Place.searchNearby(request);

    if (places.length) {
        console.log(places);

        const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
        const bounds = new LatLngBounds();

        // Loop through and get all the results.
        places.forEach((place) => {
            const markerView = new AdvancedMarkerElement({
                map,
                position: place.location,
                title: place.displayName,
            });

            bounds.extend(place.location as google.maps.LatLng);
            console.log(place);
        });

        // map.fitBounds(bounds);

    } else {
        console.log("No results");
    }
}
