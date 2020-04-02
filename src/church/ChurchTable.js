import React from 'react';
import filterIcon from '../filter.png';
import '../App.css';
import useChurchContext, {ChurchContext} from './ChurchContext.js';
import ChurchFilterSort from './ChurchFilterSort.js';


const axios     = require('axios').default;
const columns   = ["*", "id", "active", "name"];



class ChurchTable extends React.Component {

    static contextType = ChurchContext;


    constructor(props) {
        super(props);

        this.loadPage           = this.loadPage.bind(this);
        this.handleResponse     = this.handleResponse.bind(this);
        this.handleSelection    = this.handleSelection.bind(this);
        this.addFilterSort      = this.addFilterSort.bind(this);

        this.state = {
            size: 20,
            filterSort: false,
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
        //alert("ChurchTable: componentDidUpdate: context.refresh=" + this.context.refresh + "/state.refresh=" + this.state.refresh);

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

        const url = this.addFilterSort("/api/church?page=" + page + "&size=" + size);

        alert("ChurchTable: loadPage: url=" + url);
        axios
            .get(url, {
                headers: {'Authorization': 'Bearer ' + this.props.appctx.jwt},
            })
            .then(this.handleResponse)
            .catch(function(error) {
              	alert("Error: " + error );
              	if (error.response) {
              	    console.log("ChurchTable: loadPage: error response: " + JSON.stringify(error.response));
              	}
            })
            .then(function() {
            });
    }

    addFilterSort(baseurl) {
        const filterSort = this.context.filterSort;

        let url     = baseurl;
        let sortBy  = [];

        if ((typeof filterSort.activeLike !== "undefined") && (filterSort.activeLike !== null)) {
            url = url + "&active=" + filterSort.activeLike;
        }
        if ((typeof filterSort.nameLike !== "undefined") && (filterSort.nameLike !== null)) {
            url = url + "&name=" + encodeURIComponent(filterSort.nameLike);
        }

        this.addSort(sortBy, filterSort.activeSort, "active");
        this.addSort(sortBy, filterSort.nameSort, "name");

        if (sortBy.length > 0) {
            url = url + "&sortBy=" + sortBy.join();
        }

        return url;
    }

    addSort(sorts, value, field) {
        if ((typeof value !== "undefined") && (value !== null)) {
            if (value ==="ASC") {
                sorts.push(field);
            }
            else {
                sorts.push("-" + field);
            }
        }
    }

    handleResponse(response) {
       // alert("ChurchTable: handleResponse: " + JSON.stringify(response));
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
        // alert("Selected");
        this.setState((state, props) => ({
            selection: index,
            selected: row,
        }),
        () => {
            ctx.updateSelection(index, row);
        });
    }

    handleFilter(ctx) {
        this.setState({
            filterSort: true
        });
    }

    closeFilterSortModal(churchctx, event) {
        const filterSort    = churchctx.filterSort;

        if (filterSort != null) {

        }

        this.setState({
            filterSort: false
        });
    }

    render() {
        const   key = "ChurchTable-";

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
                <ChurchFilterSort status={this.state.filterSort} closeHandler={this.closeFilterSortModal.bind(this)} />
                <table key={key+"table"} >
                    <thead key={key+"thead"} >
                        <tr key={key+"thread-tr"}>
                            <RenderHeaders filterHandler={this.handleFilter.bind(this)}/>
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
    const   ctx     = useChurchContext();
    const   key     = "ChurchTable-th";

    return columns.map((column, index)=>{
        if (column === "*") {
            return <th key={key+column}> <img src={filterIcon} onClick={() => props.filterHandler(ctx)} height="16" width="16" alt="update filter and sort"/> </th>
        }

        return <th key={key+column}> {column.toUpperCase()} </th>
    });
}

function RenderRows(props) {
    const   ctx     = useChurchContext();
    const   items   = props.items;
    const   key     = "ChurchTable-tr";

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
        else if (column === "active") {
            return <td key={key+index}> {props.data[column] ? "Y" : ""} </td>
        }
        else {
            return <td key={key+index}>{props.data[column]}</td>
        }
    });
}

export default ChurchTable;
