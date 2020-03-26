import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import UserContext from './UserContext.js';

import Paginator from '../Paginator.js';
import UserTable from './UserTable.js';
import UserEditor from './UserEditor.js';


const axios     = require('axios').default;





class ManageUser extends React.Component {

    static contextType = AppContext;



    constructor(props) {
        super(props);

        this.loadPage       = this.loadPage.bind(this);
        this.handleResponse = this.handleResponse.bind(this);


        this.updateSelection = (index, selected) => {
            this.setState(state => ({
                selection:  index,
                selected:   selected,
                refresh:    true
            }));
        }

        this.refreshTable = () => {
            this.setState(state => ({
                refresh: true
            }))
        }

        this.state = {
            page:       null,
            selection:  null,
            selected:   {},
            refresh:    false,

            updateSelection:    this.updateSelection
        }
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
        const config = {
            headers: {'Authorization': 'Bearer ' + this.context.jwt},
        };

        axios
            .get("/api/user", config)
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
                page: response.data,
                refresh: false
            }));
        }
        else {
        	alert("Not Success: " + JSON.stringify(response));
        }
    }


    handleMoveRight() {
    }

    handleMoveLeft() {
    }

    handleClick() {
    }


    render() {
        return (
            <UserContext.Provider value={this.state}>
                <div class="User-content">
                    <UserEditor userContext={this.state} />
                    <Paginator page={this.state.page} />
                    <UserTable page={this.state.page}/>
                </div>
            </UserContext.Provider>
        );
    }
}


export default ManageUser;
