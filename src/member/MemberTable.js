import React from 'react';
//import logo rom './logo.svg';
import '../App.css';
import useMemberContext, {MemberContext} from './MemberContext.js';



const axios     = require('axios').default;
const columns   = ["*", "id", "active", "name", "otherName", "startDate", "endDate", "regular"];



class MemberTable extends React.Component {

    static contextType = MemberContext;


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

        //alert("MemberTable: constructor: " + JSON.stringify(this.state));
    }

    componentDidMount() {
        this.loadPage(this.props.pagectx);
   	}

    componentDidUpdate () {
        //alert("MemberTable: componentDidUpdate: context.refresh=" + this.context.refresh + "/state.refresh=" + this.state.refresh);

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
            this.setState(state => ({
                page: pagectx.currentPage
            }));
        }

        const page = pagectx === null ? 0 : pagectx.currentPage;
        const size = this.state.size;

        //alert("MemberTable: loadPage: " + page);
        axios
            .get("/api/member?page="+page+"&size="+size, {
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
        //alert("MemberTable: handleResponse: " + JSON.stringify(response));
        if (response.status === 200) {
            this.setState({
                data: response.data,
            });
            this.context.datasourceClear();
        }
        else {
        	alert("Not Success: " + JSON.stringify(response));
        }
    }

    handleSelection(ctx, index, row) {
        //alert("Selected: " + JSON.stringify(row));
        this.setState((state, props) => ({
            selection: index,
            selected: row,
        }),
        () => {
            ctx.updateSelection(index, row);
        });
    }

    render() {
        const   key = "MemberTable-";

        if (this.state.data == null) {
            return (
                <div className="table">
                    <table key={key+"table"}>
                        <thead key={key+"thread"} />
                        <tbody key={key+"tbody"} />
                    </table>
                </div>
            )
        }

        //alert("ChurchTable: rows of table");
        return (
            <div className="table">
                <table key={key+"table"} >
                    <thead key={key+"thead"} >
                        <tr key={key+"thread-tr"}>
                            <RenderHeaders />
                        </tr>
                    </thead>
                    <tbody key={key+"tbody"} >
                        <RenderRows items={this.state.data.content} onClick={this.handleSelection}/>
                    </tbody>
                </table>
            </div>
        );
    }
}

function RenderHeaders(props) {
    const   key = "MemberTable-th";

    return columns.map((column, index)=>{
        return <th key={key+column}>{column.toUpperCase()}</th>
    });
}

function RenderRows(props) {
    const   ctx     = useMemberContext();
    const   items   = props.items;
    const   key     = "MemberTable-tr";

    return items.map((row, index) => {
        return (
            <tr key={key+index} className={index === ctx.selection ? "selected" : "not-selected"} onClick={() => props.onClick(ctx, index, row)}>
                <RenderARow keyPrefix={key+index} data={row} />
            </tr>
        );
    });
}

function RenderARow(props) {
    const   key = props.keyPrefix + "-td";

    return columns.map((column, index) => {
        if (index === 0) {
            return <td key={key+index}> ACTION </td>
        }
        else if ((column === "active") || (column === "regular")) {
            return <td key={key+index}> {props.data[column] ? "Y" : ""} </td>
        }
        else {
            return <td key={key+index}>{props.data[column]}</td>
        }
    });
}

export default MemberTable;
