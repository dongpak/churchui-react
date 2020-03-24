import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import UserContext from '../AppContext.js';
import ChurchContext from './ChurchContext.js';



class ChurchTable extends React.Component {

    static contextType = ChurchContext;


    constructor(props) {
        super(props);

        this.getHeaders         = this.getHeaders.bind(this);
        this.getRowsData        = this.getRowsData.bind(this);
        this.getKeys            = this.getKeys.bind(this);
        this.handleSelection    = this.handleSelection.bind(this);
    }

    getKeys() {
        return ["*", "id", "active", "name"];
    }

    getHeaders() {
        return this.getKeys().map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        });
    }

    getRowsData() {
        var items   = this.props.page.content;
        var keys    = this.getKeys();
        return items.map((row, index) => {
            return (
                <tr className={index === this.context.selection ? "selected" : "not-selected"} onClick={() => this.handleSelection(index, row)}>
                    <RenderRow key={index} data={row} keys={keys} />
                </tr>
            );
        });
    }

    handleSelection(index, row) {
        this.context.updateSelection(index, row);
    }

    render() {
        if (this.props.page == null) {
            return (
                <div>
                    <table>
                        <thead/>
                        <tbody/>
                    </table>
                </div>
            )
        }

        return (
            <div className="table">
                <table>
                    <thead>
                        {this.getHeaders()}
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>
        );
    }
}


function RenderRow(props) {
    return props.keys.map((key, index) => {
        if (index == 0) {
            return <td> ACTION </td>
        }
        else {
            return <td key={props.data[key]}>{props.data[key]}</td>
        }
    });
}

export default ChurchTable;
