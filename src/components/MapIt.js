import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

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

class MapIt extends React.Component {
    static defaultProps = {
        defaultCenter: {
            // Wichita, Kansas
            lat: 37.697948,
            lng: -97.314835
        },
        defaultZoom: 4,
        mapSize: {
            width: 650,
            height: 510
        }
    }

    state = {
        // All the Marker components rendered on the map
        activeMarkers: null,

        // Google map parameters
        centerLat: this.props.defaultCenter.lat,
        centerLng: this.props.defaultCenter.lng,
        zoom: this.props.defaultZoom
    }

    calculateBounds = (rows) => {
        let initLat = rows[0].geo.lat;
        let initLng = rows[0].geo.lng;
        let neLat = initLat;
        let neLng = initLng;
        let swLat = initLat;
        let swLng = initLng;

        const len = rows.length;
        for (let i = 0; i < len; i++) {
            const lat = rows[i].geo.lat;
            const lng = rows[i].geo.lng;
            if (lat > neLat) {
                neLat = lat;
            } else if (lat < swLat) {
                swLat = lat;
            }

            if (lng > neLng) {
                neLng = lng;
            } else if (lng < swLng) {
                swLng = lng;
            }
        }

        return {
            ne: {
                lat: neLat,
                lng: neLng
            },
            sw: {
                lat: swLat,
                lng: swLng
            }
        };
    }

    handleClick = (i) => {
        const bounds = this.calculateBounds(this.props.tables[i]);
        const { center, zoom } = fitBounds(bounds, this.props.mapSize);
        this.setState({
            centerLat: center.lat,
            centerLng: center.lng,
            zoom: zoom,
            activeMarkers : this.renderMarkers(this.props.tables[i])
        });
    }

    renderMarkers = (entries) => {
        return entries.map((entry, i) => {
            return (
                <Marker key={i} lat={entry.geo.lat} lng={entry.geo.lng} />
            );
        });
    }

    render() {
        return (
            <div className="container border mt-3 mb-3">
                <h1>Map It</h1>
                 <div className="mb-5">
                    {this.props.tables.length ? <h4>Select from your recent three entries</h4> : ''}
                    {this.props.tables.map((v, i) => {
                        return <button
                            key={i}
                            type="button"
                            className="btn btn-info mr-2"
                            onClick={() => this.handleClick(i)}>
                            {i+1}
                        </button>;
                    })}
                </div>
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
                        defaultCenter={{ lat: this.props.defaultCenter.lat, lng: this.props.defaultCenter.lng }}
                        center={{ lat: this.state.centerLat, lng: this.state.centerLng }}
                        defaultZoom={this.props.defaultZoom}
                        zoom={this.state.zoom}
                    >
                        {this.state.activeMarkers}
                    
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

MapIt.propTypes = {
    googleMapsApiKey: PropTypes.string.isRequired,
    tables: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object))
}

export default MapIt;
