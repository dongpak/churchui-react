import React from 'react';
import './App.css';
import UserContext from './AppContext.js'

const axios     = require('axios').default;


function AppLogin(props) {
    if (props.jwt == null) {
        return <LoginDialog/>
    }
    else {
        return <UserLoggedIn/>
    }
}

class UserLoggedIn extends React.Component {

    static contextType = UserContext;

    render() {
        return (
            <div className="App-logged-in">
                <p> Logged in as {this.context.username} </p>
            </div>
         );
    }
}

class LoginDialog extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();

        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
			.post("/api/auth/jwt", {
    			"name": this.username.current.value,
    			"token": this.password.current.value
			})
			.then(this.handleResponse)
			.catch(function(error) {
					alert("Error: " + JSON.stringify(error.toJSON()));
			})
			.then(function() {
			});
    }

    handleResponse(response) {
        if (response.status == 200) {
    	    this.context.updateUser(this.username.current.value, response.data);
    	}
    	else {
    	    alert("Not Success: " + JSON.stringify(response));
    	}
    }


    render() {
        return (
            <div className="App-login">
                <div>
                    <p> Access Requires Login </p>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div >
                        <label> User Name: </label>
                    </div>
                    <div>
                        <input type="text" name="username" ref={this.username} />
                    </div>
                    <div>
                        <label > Password: </label>
                    </div>
                    <div>
                        <input type="password" name="password" ref={this.password} />
                    </div>
                    <div className="App-login-submit">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
         );
    }
}

export default AppLogin;
