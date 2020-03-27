import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AppContext from './AppContext.js';
import AppLogin from './AppLogin.js';

const axios     = require('axios').default;


class AppMenu extends React.Component {

    static contextType = AppContext;

    render() {
        return (
            <div className="App-menu">
                <LoginOrMenu jwt={this.context.jwt}/>
            </div>
        );
    }
}

function LoginOrMenu(props) {
    //alert("AppMenu: LoginOrMenu: jwt=" + props.jwt);

    if (props.jwt === null) {
        return <AppLogin/>
    }

    return <CallerBasedMenu/>
}

class CallerBasedMenu extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
        this.hasRoles       = this.hasRoles.bind(this);
    }

    componentDidMount() {
        if (this.context.apiCaller === null) {
            axios
    			.get("/api/auth/info", {
                    headers: {'Authorization': 'Bearer ' + this.context.jwt},
    			})
    			.then(this.handleResponse)
    			.catch(function(error) {
    					alert("Error: " + JSON.stringify(error.toJSON()));
    			})
    			.then(function() {
    			});
    	}
    }

    handleResponse(response) {
        if (response.status === 200) {
            this.context.updateApiCaller(response.data);
        }
        else {
        	alert("Not Success: " + JSON.stringify(response));
        }
    }

    hasRoles() {
        if (this.context.apiCaller === null) {
            return false;
        }

        const roles = this.context.apiCaller.roles;

        let i = 0;
        for (i = 0; i < arguments.length; i++) {
            if (roles.includes(arguments[i])) {
                return true;
            }
        }

        return false;
    }

    render() {
        return (
            <div className="App-menu">
                <MenuItem name="Manage Churches" activate={this.hasRoles("SUPER")} />
                <MenuItem name="Manage Users" activate={this.hasRoles("SUPER", "ADMIN")} />
                <MenuItem name="Manage Members" activate={this.hasRoles("SUPER", "ADMIN", "CLERK")} />
                <MenuItem name="Change User" activate={true}/>
            </div>
        );
    }
}



function MenuItem(props) {

    if (props.activate) {
        return (
            <ActiveMenu name={props.name} />
        );
    }
    else {
        return (
            <h3 className="keep-together gray-out"> {props.name} </h3>
        );
    }
}


class ActiveMenu extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, item) {
        e.preventDefault();
        if (item === "Change User") {
            this.context.updateApiCaller(null);
            this.context.updateUser(null, null);
        }
        else {
            this.context.updateAppContent(item);
        }
    }

    render() {
        return (
            <h3>
                <a className="keep-together" onClick={(e) => this.handleClick(e, this.props.name)}>
                    {this.props.name}
                </a>
            </h3>
        );
    }
}

export default AppMenu;
