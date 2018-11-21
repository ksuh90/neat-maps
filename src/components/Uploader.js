import React from 'react';
import CSVReader from "react-csv-reader";

class Uploader extends React.Component {

    state = {
        validationMsg: '',
    }

    onFileLoaded = (data) => {
        console.log(data);
        const table = this.verifyFormat(data) ? data : {};
        this.props.setCurrentTable(table);
    }

    errorHandler = () => {
        this.setValidationMsg('Something went wrong!');
        this.props.setCurrentTable({});
    }

    setValidationMsg = (s) => {
        let validationMsg = this.state.validationMsg;
        validationMsg = s;
        this.setState({ validationMsg })
    }

    verifyFormat = data => {
        const len = data.length;
        if (!len) {
            // file is empty
            this.setValidationMsg('File is empty!');
            return false;
        }

        for (let i = 0; i < len; i++) {
            if (data[i].length !== 5) {
                const msg = `${i+1}th row does not have 5 columns!`;
                this.setValidationMsg(msg);
                return false;
            }
        }

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
