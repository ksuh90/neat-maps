import React from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../config';

class Marker extends React.Component {
    render() {
        return (
            <div style={{
                color: 'white', 
                background: 'grey',
                padding: '5px 5px',
                display: 'inline-flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100%',
                transform: 'translate(-50%, -50%)'
            }}></div>
        );
    }
}

class Map extends React.Component {

    static defaultProps = {
        center: {
          lat: 37.697948,
          lng: -97.314835
        },
        zoom: 4

      };
    
    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: config.google_maps_api_key }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Marker lat={42.7243926} lng={-84.6084649} />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
