import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import UserContext from './UserContext.js';
import UserRoles from './UserRoles.js';



const axios     = require('axios').default;



class UserEditor extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);

        this.active     = React.createRef();
        this.name       = React.createRef();
        this.token      = React.createRef();
        this.church     = React.createRef();
        this.churchId   = React.createRef();
        this.clear      = React.createRef();

        this.handleClear    = this.handleClear.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);

        this.state = {
            searchChurch: false,
            churchPage: null
        };
        //alert("ChurchEditor constructor");
    }

    componentDidUpdate () {
        const selected = this.props.userContext.selected;

        if (selected != null) {
            if (selected.active != null) {
                this.active.current.checked = selected.active ? "checked" : "";
            }
            if (selected.name != null) {
                this.name.current.value = selected.name;
            }
            if (selected.token != null) {
                this.token.current.value = selected.token;
            }
            if (selected.churchId != null) {
                this.church.current.value = selected.churchId;
            }
        }
    }

    searchChurchHandler(event) {
        this.setState(state => ({
            searchChurch: true
        }));
    }

    handleClear(event) {
        this.props.userContext.updateSelection(null, {});
    }

    handleSubmit(event) {
        let url     = "/api/user";
        let payload = {
            "active": this.active.current.checked,
            "name": this.name.current.value
        };
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.context.jwt,
                'Content-Type': 'application/json'
            }
        }

        event.preventDefault();

        if (this.props.churchContext.selection == null) {
            axios
        	    .post(url, payload, config)
        		.then(this.handleResponse)
        		.catch(function(error) {
        			alert("Error: " + error);
        		})
        		.then(function() {
        		});
        }
        else {
            payload.id = this.props.churchContext.selected.name;
            url = url + "/" + payload.name;

            axios
          	    .put(url, payload, config)
          		.then(this.handleResponse)
                .catch(function(error) {
                	alert("Error: " + error);
          		})
           		.then(function() {
          		});
        }
    }


    handleResponse(response) {
        if (response.status === 200) {
            this.clear.current.click();
    	}
    	else {
    	    alert("Not Success: " + JSON.stringify(response));
    	}
    }
 /**
                    <ChurchContext.Provider value={this.state}>
                        <div className={modelState}>
                            <ChurchTable page={this.state.churchPage}/>
                        </div>
                    </ChurchContext.Provider>
                **/
    render() {
        const modalState = this.state.searchChurch ? "modal modal-on" : "modal modal-off";
        return (
            <UserContext.Consumer>
            {context =>
                <div className="editor">

                    <form className="editor-form" onSubmit={this.handleSubmit}>
                        <label for="active"> Active </label>
                        <input id="active" type="checkbox" name="active" ref={this.active} />

                        <label for="name" className="keep-together"> User Name* </label>
                        <input id="name" required="true" type="text" name="name" ref={this.name} />

                        <label for="token" className="keep-together"> User Token* </label>
                        <input id="token" required="true" type="password" name="token" ref={this.token} />

                        <label for="roles" className="keep-together"> User Roles* </label>
                        <select id="roles" multiple="true" required="true" ref={this.roles}>
                            {UserRoles(this.context.apiCaller)}
                        </select>

                        <label for="church" className="keep-together"> User Church* </label>
                        <input id="church" required="true" type="text" readonly="readonly" onClick={this.searchChurch} ref={this.church} />
                        <input id="churchId" type="hidden" ref={this.churchId} />

                        <label for="createdby"> Created By </label>
                        <input id="createdby" readonly="readonly" type="text" name="createdby" value={context.selected.createdBy} />

                        <label for="createddate"> Created Date </label>
                        <input id="createddate" readonly="readonly" type="text" name="createddate" value={context.selected.createdDate} />

                        <label for="updatedby"> Updated By </label>
                        <input id="updatedby" readonly="readonly" type="text" name="updatedby" value={context.selected.updatedBy} />

                        <label for="updateddate"> Updated Date </label>
                        <input id="updateddate" readonly="readonly" type="text" name="updateddate" value={context.selected.updatedDate}/>

                        <div>
                            <input className="login-button" type="submit" value="Save" />
                            <button className="login-button" type="reset" onClick={this.handleClear} ref={this.clear} >Clear</button>
                        </div>
                    </form>
                </div>
            }
            </UserContext.Consumer>
        );
    }
}


export default UserEditor;
