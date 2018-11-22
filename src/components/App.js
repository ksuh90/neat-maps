import React from 'react';
import config from '../config';
import Uploader from './Uploader';
import Normalize from './Normalize';
import MapIt from './MapIt';

const MAX_TABLES = 3;

const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends React.Component {

    state = {
        currentTable: [],
        tables: [],
    }

    setCurrentTable = (data) => {
        let currentTable = this.state.currentTable;
        currentTable = data;
        this.setState({ currentTable });
    }

    addTable = async (newTable) => {
        let tables = this.state.tables;
        if (tables.length >= MAX_TABLES) {
            // We only save MAX_TABLES number of tables
            tables.shift();
        }
        const geocodes = await this.getGeocodes(newTable);
        // Mapp geo codes to the new table
        newTable.map((v, i) => {
            v['geo'] = geocodes[i];
            return v;
        });
        tables.push(newTable);
        this.setState({ tables });
    }

    getMapsApiUrl = (apiKey, address) => {
        return `${GOOGLE_MAPS_API}?address=${address}&key=${apiKey}`;
    }

    getGeocodes = async (table) => {
        try {
            // Let's request them in parallel for performance
            const data = await Promise.all(
                table.map(
                    row => {
                        const url = this.getMapsApiUrl(config.google_maps_api_key, row.address);
                        return fetch(url).then(
                            (response) => {
                                return response.json().then(
                                    (json) => {
                                        return json.results[0].geometry.location;
            })})}));
            return data;
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }

    render() {
        return (
            <div className="container">
                <Uploader setCurrentTable={this.setCurrentTable} />
                <Normalize currentTable={this.state.currentTable} addTable={this.addTable} />
                <MapIt tables={this.state.tables} googleMapsApiKey={config.google_maps_api_key} />
            </div>
        );
    }
}

export default App;
