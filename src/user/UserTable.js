import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import UserContext from './UserContext.js';



const axios     = require('axios').default;
const keys      = ["*", "active", "name", "token", "roles", "churchId"];



class UserTable extends React.Component {

    static contextType  = AppContext;

    constructor(props) {
        super(props);

        this.getHeaders         = this.getHeaders.bind(this);
        this.getRowsData        = this.getRowsData.bind(this);
        this.getKeys            = this.getKeys.bind(this);
        this.handleSelection    = this.handleSelection.bind(this);

        this.state = {
            page: props.churchContext.page == null ? 0 : props.churchContext.page,
            size: props.churchContext.size == null ? 20 : props.churchContext.size,
            filter: props.churchContext.filter,
            data: null,
            selection: null,
            selected: null,
            refresh: false
        }

        alert("State: " + JSON.stringify(this.state));
    }

    componentDidMount() {
        this.loadPage();
   	}

    componentDidUpdate () {
        if (this.state.refresh == true) {
            this.loadPage();
        }
    }

    loadPage() {
        axios
            .get("/api/church?page="+this.state.page+"&size="+this.state.size, {
                headers: {'Authorization': 'Bearer ' + this.context.jwt},
          	})
            .then(this.handleResponse)
            .catch(function(error) {
            	alert("Error: " + error);
            })
            .then(function() {
            });
    }

    handleResponse(response) {
        if (response.status == 200) {
            //alert(JSON.stringify(response.data));
            this.setState(state => ({
                data: response.data,
                refresh: false
            }));
        }
        else {
        	alert("Not Success: " + JSON.stringify(response));
        }
    }

    getHeaders() {
        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        });
    }

    getRowsData() {
        var items   = this.state.data.content;

        return items.map((row, index) => {
            return (
                <tr className={index === this.state.selection ? "selected" : "not-selected"} onClick={() => this.handleSelection(index, row)}>
                    <RenderRow key={index} data={row} keys={keys} />
                </tr>
            );
        });
    }

    handleSelection(index, row) {
        this.props.churchContext.updateContext(this.state);
    }

    render() {
        if (this.props.churchContext.data == null) {
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
    var items   = this.state.data.content;

    return keys.map((key, index) => {
        if (index == 0) {
            return <td>ACTION</td>
        }
        else {
            return <td>{items[key]}</td>
        }
    });
}

export default UserTable;
