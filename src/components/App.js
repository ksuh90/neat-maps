import React from 'react';
import Uploader from './Uploader';
import Normalize from './Normalize';
import MapIt from './MapIt';

const MAX_TABLES = 3;

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

    addTable = (newTable) => {
        let tables = this.state.tables;
        if (tables.length >= MAX_TABLES) {
            tables.shift();
        }
        tables.push(newTable);
        this.setState({ tables });
    }

    render() {
        return (
            <div className="container">
                <Uploader setCurrentTable={this.setCurrentTable} />
                <Normalize currentTable={this.state.currentTable} addTable={this.addTable} />
                <MapIt tables={this.state.tables} />
            </div>
        );
    }
}

export default App;
