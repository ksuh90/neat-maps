import React from 'react';
import Uploader from './Uploader';
import ColumnSelector from './ColumnSelector';
import Map from './Map';

class App extends React.Component {
    
    render() {
        return (
            <div className="container">
                <Uploader />
                <ColumnSelector />
                <Map />
            </div>
        );
    }
}

export default App;
