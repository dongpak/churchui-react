import React from 'react';
import './App.css';
import AppContext from './AppContext.js'

const axios     = require('axios').default;


class AppLogin extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();

        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);

        console.log("AppLogin: constructor");
    }

   componentDidMount () {
         console.log("AppLogin: componentDidMount: easy=" + this.props.easy);

        if (typeof this.props.easy === "undefined") {
            this.username.current.value = "admin";
            this.password.current.value = "superadmin";
        }
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
					alert("Error: " + error);
			})
			.then(function() {
			});
    }

    handleResponse(response) {
        if (response.status === 200) {
    	    this.context.updateUser(this.username.current.value, response.data);
    	}
    	else {
    	    alert("Not Success: " + JSON.stringify(response));
    	}
    }


    render() {
        return (
            <div>
                    <form className="login-flex" onSubmit={this.handleSubmit}>
                        <div className="login-item">
                            <label className="keep-together"> *User Name: </label>
                        </div>
                        <div className="login-item">
                            <input required="required" type="text" name="username" ref={this.username} />
                        </div>
                        <div className="login-item">
                            <label> *Password: </label>
                        </div>
                        <div className="login-item">
                            <input required="required" type="password" name="password" ref={this.password} />
                        </div>
                        <div className="login-item">
                            <input className="login-button" type="submit" value="Authenticate" />
                        </div>
                    </form>
            </div>
         );
    }
}

export default AppLogin;
