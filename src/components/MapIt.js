import React from 'react';
import Map from './Map';

class MapIt extends React.Component {
    
    render() {
        return (
            <div className="container border mt-3 mb-3">
                <h1>Map It</h1>
                 <div className="mb-5">
                    {this.props.tables.map((v, i) => {
                        return <button key={i} type="button" className="btn btn-info mr-2">{i+1}</button>
                    })}
                </div>
                <div>
                    <Map />
                </div>
            </div>
        );
    }
}

export default MapIt;
