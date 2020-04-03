import React from 'react';
import filterIcon from '../filter.png';
import '../App.css';
import useMemberContext, {MemberContext} from './MemberContext.js';
import MemberFilterSort from './MemberFilterSort.js';


const axios     = require('axios').default;
const columns   = ["*", "id", "active", "name", "otherName", "startDate", "endDate", "regular"];



class MemberTable extends React.Component {

    static contextType = MemberContext;


    constructor(props) {
        super(props);

        this.loadPage               = this.loadPage.bind(this);
        this.handleResponse         = this.handleResponse.bind(this);
        this.handleErrorResponse    = this.handleErrorResponse.bind(this);
        this.handleSelection        = this.handleSelection.bind(this);
        this.addFilterSort          = this.addFilterSort.bind(this);
        this.addSort                = this.addSort.bind(this);

        this.state = {
            size: 20,
            filterSort: false,
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

        const url = this.addFilterSort("/api/member?page=" + page + "&size=" + size);

        // alert("MemberTable: loadPage: url=" + url);
        axios
            .get(url, {
                headers: {'Authorization': 'Bearer ' + this.props.appctx.jwt},
            })
            .then(this.handleResponse)
            .catch(this.handleErrorResponse)
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
        if ((typeof filterSort.otherNameLike !== "undefined") && (filterSort.otherNameLike !== null)) {
            url = url + "&otherName=" + encodeURIComponent(filterSort.otherNameLike);
        }
        if ((typeof filterSort.startDateLike !== "undefined") && (filterSort.startDateLike !== null)) {
            url = url + "&startDate=" + encodeURIComponent(filterSort.startDateLike);
        }
        if ((typeof filterSort.endDateLike !== "undefined") && (filterSort.endDateLike !== null)) {
            url = url + "&endDate=" + encodeURIComponent(filterSort.endDateLike);
        }
        if ((typeof filterSort.regularLike !== "undefined") && (filterSort.regularLike !== null)) {
            url = url + "&regular=" + encodeURIComponent(filterSort.regularLike);
        }

        if ((typeof filterSort.churchId !== "undefined") && (filterSort.churchId !== null)) {
            url = url + "&churchId=" + encodeURIComponent(filterSort.churchId);
        }

        this.addSort(sortBy, filterSort.activeSort, "active");
        this.addSort(sortBy, filterSort.nameSort, "name");
        this.addSort(sortBy, filterSort.otherNameSort, "otherName");
        this.addSort(sortBy, filterSort.startDateSort, "startDate");
        this.addSort(sortBy, filterSort.endDateSort, "endDate");
        this.addSort(sortBy, filterSort.regularSort, "regular");

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

    handleErrorResponse(error) {
        this.context.datasourceClear();

        alert("Error: " + error);
        if (error.response) {
            console.log("MemberTable: loadPage: error response=" + JSON.stringify(error.response));
        }
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


    handleFilter(ctx) {
        this.setState({
            filterSort: true
        });
    }

    closeFilterSortModal(memberctx, event) {
        const filterSort    = memberctx.filterSort;

        if (filterSort != null) {

        }

        this.setState({
            filterSort: false
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
                <MemberFilterSort status={this.state.filterSort} closeHandler={this.closeFilterSortModal.bind(this)} />
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
    const   ctx     = useMemberContext();
    const   key     = "MemberTable-th";

    return columns.map((column, index)=>{
        if (column === "*") {
            return <th key={key+column}> <img src={filterIcon} onClick={() => props.filterHandler(ctx)} height="16" width="16" alt="update filter and sort"/> </th>
        }

        return <th key={key+column}> {column.toUpperCase()} </th>
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
