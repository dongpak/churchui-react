import React, { useContext } from 'react';
//import logo rom './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import useChurchContext, {ChurchContext} from './ChurchContext.js';



const axios     = require('axios').default;
const columns   = ["*", "id", "active", "name"];



class ChurchTable extends React.Component {

    static contextType = ChurchContext;


    constructor(props) {
        super(props);

        this.loadPage           = this.loadPage.bind(this);
        this.handleResponse     = this.handleResponse.bind(this);
        this.handleSelection    = this.handleSelection.bind(this);

        this.state = {
            size: 20,
            filter: {},
            data: null,
            selection: null,
            selected: {},
            refresh: false
        }

        //alert("ChurchTable: constructor: " + JSON.stringify(this.state));
    }

    componentDidMount() {
        this.loadPage(this.props.pagectx);
   	}

    componentDidUpdate () {
        if (this.context.refresh === true) {
            this.loadPage(this.props.pagectx);
        }
        else
        if (this.state.page != this.props.pagectx.currentPage) {
            this.loadPage(this.props.pagectx);
        }
    }

    loadPage(pagectx) {
        if (pagectx != null) {
            this.setState(state => ({
                page: pagectx.currentPage
            }));
        }

        const page = pagectx === null ? 0 : pagectx.currentPage;
        const size = this.state.size;

        //alert("ChurchTable: loadPage: " + page);
        axios
            .get("/api/church?page="+page+"&size="+size, {
                headers: {'Authorization': 'Bearer ' + this.props.appctx.jwt},
            })
            .then(this.handleResponse)
            .catch(function(error) {
              	alert("Error: " + error);
            })
            .then(function() {
            });
    }

    handleResponse(response) {
       // alert("ChurchTable: handleResponse: " + JSON.stringify(response));
        if (response.status === 200) {
            this.setState(state => ({
                data: response.data,
                refresh: false
            }),
            () => {
                this.context.datasourceClear();
            });
        }
        else {
        	alert("Not Success: " + JSON.stringify(response));
        }
    }

    handleSelection(ctx, index, row) {
        // alert("Selected");
        this.setState((state, props) => ({
            selection: index,
            selected: row,
        }),
        () => {
            ctx.updateSelection(index, row);
        });
    }

    render() {
        //alert("ChurchTable: render");
        if (this.state.data == null) {
            //alert("ChurchTable: empty table");
            return (
                <div className="table">
                    <table>
                        <thead/>
                        <tbody/>
                    </table>
                </div>
            )
        }

        //alert("ChurchTable: rows of table");
        return (
            <div className="table">
                <table>
                    <thead>
                        <RenderHeaders />
                    </thead>
                    <tbody>
                        <RenderRows items={this.state.data.content} onClick={this.handleSelection}/>
                    </tbody>
                </table>
            </div>
        );
    }
}

function RenderHeaders(props) {
    return columns.map((column, index)=>{
        return <th>{column.toUpperCase()}</th>
    });
}

function RenderRows(props) {
    const   ctx     = useChurchContext();
    const   items   = props.items;

    return items.map((row, index) => {
        return (
            <tr className={index === ctx.selection ? "selected" : "not-selected"} onClick={() => props.onClick(ctx, index, row)}>
                <RenderARow key={index} data={row} />
            </tr>
        );
    });
}

function RenderARow(props) {
    //alert("RenderRow");
    return columns.map((column, index) => {
        if (index === 0) {
            return <td> ACTION </td>
        }
        else {
            return <td>{props.data[column]}</td>
        }
    });
}

export default ChurchTable;
