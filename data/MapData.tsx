import { RecommendationLoc , User } from '@/data/types'

let map;
export async function nearbySearch(lat:any, long:any) {
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
        includedPrimaryTypes: [ 'library', 'casino', 'aquarium','restaurant','garden'],
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
        });
        return places as RecommendationLoc[];

        // map.fitBounds(bounds);

    } else {
        console.log("No results");
    }
}
export async function getPictureByID(placeID: string) {
    const { Place } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

    // Use a place ID to create a new Place instance.
    const place = new Place({
        id: placeID, 
    });

    // Call fetchFields, passing the desired data fields.
    await place.fetchFields({ fields: ['displayName', 'photos', 'editorialSummary'] });

    // Get the various HTML elements.
    let heading = document.getElementById('heading') as HTMLElement;
    let summary = document.getElementById('summary') as HTMLElement;
    let gallery = document.getElementById('gallery') as HTMLElement;
    let expandedImageDiv = document.getElementById('expanded-image') as HTMLElement;
    let attributionLabel;


    // Display the first photo.
    const img = document.createElement('img');
    img.src = place.photos![0].getURI();
    

    // console.log(img)
    return place.photos![0].getURI();
}