import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

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

    state = {
        activeMarkers: []
    }

    static defaultProps = {
        center: {
            // Wichita, Kansas
            lat: 37.697948,
            lng: -97.314835
        },
        zoom: 4
    }

    handleClick = (i) => {
        this.setState({ activeMarkers : this.renderMarkers(this.props.tables[i]) });
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
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
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
