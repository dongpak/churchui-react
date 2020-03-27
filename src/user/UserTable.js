import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import useUserContext, {UserContext} from './UserContext.js';



const axios     = require('axios').default;
const columns   = ["*", "active", "name", "token", "roles", "churchId"];



class UserTable extends React.Component {

    static contextType  = UserContext;


    constructor(props) {
        super(props);


        this.loadPage           = this.loadPage.bind(this);
        this.handleResponse     = this.handleResponse.bind(this);
        this.handleSelection    = this.handleSelection.bind(this);

        this.state = {
            page: 0,
            size: 20,
            filter: {},
            data: null,
            selection: null,
            selected: {},
            refresh: false
        }

        //alert("UserTable: constructor: " + JSON.stringify(this.state));
    }

    componentDidMount() {
        this.loadPage(this.props.pagectx);
   	}

    componentDidUpdate () {
        //alert("UserTable: componentDidUpdate: context.refresh=" + this.context.refresh + "/state.refresh=" + this.state.refresh);

        if (this.context.refresh === true) {
            if (this.state.refresh === false) {
                // set refresh in progress
                this.setState({
                    refresh: true
                });
                this.loadPage(this.props.pagectx);
            }
        }
        else if (this.state.refresh === true) {
            // set refresh completed
            this.setState({
                refresh: false
            });
        }
    }


    loadPage(pagectx) {
        if (pagectx !== null) {
            this.setState({
                page: pagectx.currentPage
            });
        }

        const page = pagectx === null ? 0 : pagectx.currentPage;
        const size = this.state.size;

        //alert("UserTable: loadPage: " + page);
        axios
            .get("/api/user?page="+page+"&size="+size, {
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
       // alert("UserTable: handleResponse: " + JSON.stringify(response));
        if (response.status === 200) {
            this.setState({
                data: response.data,
            });
            this.context.datasourceClear();        }
        else {
        	alert("Not Success: " + JSON.stringify(response));
        }
    }

    handleSelection(ctx, index, row) {
        // alert("Selected");
        ctx.updateSelection(index, row);
        this.setState({
            selection: index,
            selected: row,
        });
    }

    render() {
        if (this.state.data == null) {
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
        return <th key={column}>{column.toUpperCase()}</th>
    });
}

function RenderRows(props) {
    const   ctx     = useUserContext();
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
            return <td key={index}> ACTION </td>
        }
        else {
            return <td key={index}>{props.data[column]}</td>
        }
    });
}


export default UserTable;