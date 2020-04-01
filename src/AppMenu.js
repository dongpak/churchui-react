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
        return <AppLogin />
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
            <div className="App-menu-container">
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
            <button type="button" className="App-menu-button" disabled="disabled">
                {props.name}
            </button>
        );
    }
}


class ActiveMenu extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            selected: false
        };
    }

    componentDidUpdate () {
        // alert("ActiveMenu: componentDidUpdate: selected=" + this.state.selected + ", content=" + this.context.appContent);

        if (this.context.appContent !== this.props.name) {
            if (this.state.selected === true) {
                this.setState({
                    selected: false
                });
            }
        }
    }

    handleClick(e, item) {
        e.preventDefault();
        if (item === "Change User") {
            window.location.reload(false);
        }
        else {
            this.context.updateAppContent(item);
            this.setState({
                selected: true
            });
        }
    }

    render() {
        const buttonClass   = this.state.selected ? " App-menu-selected-button" : "App-menu-button";


        return (
            <button type="button" className={buttonClass} onClick={(e) => this.handleClick(e, this.props.name)}>
                    {this.props.name}
            </button>
        );
    }
}

export default AppMenu;
