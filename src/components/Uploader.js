import React from 'react';
import CSVReader from "react-csv-reader";

const MAX_ROWS = 20;
const NUM_COLUMNS = 5;

class Uploader extends React.Component {

    state = {
        validationMsg: '',
    }

    onFileLoaded = (data) => {
        console.log(data);
        this.props.setCurrentTable([]);
        const table = this.verifyFormat(data) ? data : [];
        this.props.setCurrentTable(table);
    }

    errorHandler = () => {
        this.setValidationMsg('Something went wrong!');
        this.props.setCurrentTable([]);
    }

    setValidationMsg = (s) => {
        this.setState({ validationMsg: s })
    }

    verifyFormat = data => {
        const len = data.length;
        if (!len) {
            // file is empty
            this.setValidationMsg('File is empty!');
            return false;
        }

        if (len > MAX_ROWS) {
            // too many rows
            this.setValidationMsg('To many rows!');
            return false;
        }

        for (let i = 0; i < len; i++) {
            if (data[i].length !== NUM_COLUMNS) {
                const msg = `Row ${i+1} does not have 5 columns!`;
                this.setValidationMsg(msg);
                return false;
            }
        }
        this.setValidationMsg('');
        return true;
    }
    
    render() {
        return (
            <div className="container border mt-5">
                <h1>Upload</h1>
                <CSVReader
                    onFileLoaded={this.onFileLoaded}
                    onError={this.errorHandler}
                />
                <h4 className="text-danger">{this.state.validationMsg}</h4>
          </div>
        );
    }
}

export default Uploader;
