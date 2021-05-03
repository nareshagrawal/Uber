import React, { useState, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

const MapContainer = withScriptjs(withGoogleMap(({ marker, direction }) => {
    const [directions, setDirections] = useState(null);
    useEffect(
        () => {
            if (direction?.src?.lat && direction?.dst?.lat) {
                const directionService = new window.google.maps.DirectionsService();
                directionService.route(
                    {
                        origin: direction.src,
                        destination: direction.dst,
                        travelMode: window.google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            setDirections(result);
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    }
                );
            }
        }
        , [direction]);
    return (
        <GoogleMap
            defaultCenter={marker?.src || direction?.src}
            defaultZoom={14}
        >
            {marker && <Marker
                position={marker.src} />}
            {
                direction?.src?.lat && direction?.dst?.lat && directions &&
                <DirectionsRenderer
                    directions={directions}
                ></DirectionsRenderer>
            }
        </GoogleMap>
    );
}));
export default MapContainer;