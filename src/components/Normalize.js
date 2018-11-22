import React from 'react';
import PropTypes from 'prop-types';

class Normalize extends React.Component {

    state = {
        validationMsg: '',
        selectedOptions: {} // e.g. 0 : ADDRESS
    }

    columnNames = [
        'ADDRESS', 'CITY', 'STATE', 'ZIPCODE', 'CATEGORY'
    ]

    setValidationMsg = (s) => {
        this.setState({ validationMsg: s });
    }

    handleSelectChange = (idx, e) => {
        const selectedOptions = {...this.state.selectedOptions};
        selectedOptions[idx] = e.target.value;
        this.setState({ selectedOptions });
    }

    normalizeTable = (map, rows) => {
        const normalized = [];
        const len = rows.length;
        for (let i = 0; i < len; i++) {
            const row = rows[i];
            normalized.push({
                category: row[map['CATEGORY']],
                address: `${row[map['ADDRESS']]} ${row[map['CITY']]} ${row[map['STATE']]} ${row[map['ZIPCODE']]}`
            });
        }
        return normalized;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const nameToIdx = {};
        const selectedOptions = this.state.selectedOptions;
        for (let k in selectedOptions) {
            nameToIdx[selectedOptions[k]] = parseInt(k, 10);
        }
        if (this.columnNames.length === Object.keys(nameToIdx).length) {
            this.setValidationMsg('');
            const newTable = this.normalizeTable(nameToIdx, this.props.currentTable);
            this.props.addTable(newTable);
        } else {
            const validationMsg = 'Make sure all selections are unique!';
            this.setValidationMsg(validationMsg);
        }
    }

    renderOption = (colName) => {
        return (
            <option value={colName} key={colName}>
                {colName}
            </option>
        );
    }

    renderRow = (colName, idx) => {
        return (
            <tr key={idx}>
                <td>{colName}</td>
                <td>
                    <select onChange={ e => this.handleSelectChange(idx, e) }>
                        <option defaultValue value={0}>Choose</option>
                        {this.columnNames.map((key) => (
                            this.renderOption(key)
                        ))}
                    </select>
                </td>
            </tr>
        );
    }

    renderTable = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <table className="table">
                    <tbody>
                        {this.props.currentTable[0].map((col, i) => (
                            this.renderRow(col, i)
                        ))}
                    </tbody>
                </table>
                <h4 className="text-danger">{this.state.validationMsg}</h4>
                <button type="submit" className="btn btn-primary mb-3" >Map It!</button>
            </form>
        );
    }
    
    render() {
        return (
            <div className="container border mt-3">
                <h1>Normalize</h1>
                {this.props.currentTable.length ? <h4>Please specify the columns</h4> : ''}
                {this.props.currentTable.length ? this.renderTable() : ''}
            </div>
        );
    }
}

Normalize.propTypes = {
    currentTable: PropTypes.array,
}

export default Normalize;
