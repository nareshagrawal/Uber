import React from "react";
import { Map, GoogleApiWrapper, Google } from 'google-maps-react';

const mapStyles = {
    width: 'calc(100% - 30px)',
    height: '100%'
};
const DirectedMap = () => {
    return (
        <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={
                {
                    lat: -1.2884,
                    lng: 36.8233
                }
            }
        />
    )
}

export default DirectedMap;