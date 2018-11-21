import React from 'react';
import Uploader from './Uploader';
import ColumnSelector from './ColumnSelector';
import Map from './Map';

class App extends React.Component {
    state = {
        currentTable: [],
        tables: [],
    };

    setCurrentTable = (data) => {
        let currentTable = this.state.currentTable;
        currentTable = data;
        this.setState({ currentTable });
    };

    addTable = (data) => {
        let tables = this.state.tables;
        tables.push(data);
        this.setState({ tables });
    }

    render() {
        return (
            <div className="container">
                <Uploader setCurrentTable={this.setCurrentTable} />
                <ColumnSelector currentTable={this.state.currentTable} addTable={this.addTable} />
                <Map tables={this.state.tables} />
            </div>
        );
    }
}

export default App;
