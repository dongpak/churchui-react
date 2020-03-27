import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import SearchChurchModal from '../church/SearchChurchModal.js';

import { UserContext } from './UserContext.js';
import UserRoles from './UserRoles.js';



const axios     = require('axios').default;



class UserEditor extends React.Component {

    static contextType = UserContext;


    constructor(props) {
        super(props);

        this.active     = React.createRef();
        this.name       = React.createRef();
        this.token      = React.createRef();
        this.roles      = React.createRef();
        this.church     = React.createRef();
        this.churchId   = React.createRef();
        this.clear      = React.createRef();

        this.handleResponse = this.handleResponse.bind(this);

        this.state = {
            searchChurch: false
        }

        //alert("ChurchEditor constructor");
    }

    componentDidUpdate () {
        const selected = this.context.selected;

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
                this.churchId.current.value = selected.churchId;
            }
        }

        alert("UserEditor: componentDidUpdate");
    }

    openSearchChurchModal(event) {
        this.setState({
            searchChurch: true
        });
    }

    closeSearchChurchModal(churchctx, event) {
        const selection = churchctx.selection;
        const selected  = churchctx.selected;

        if (selection != null) {
            if (selected.id != null) {
                this.churchId.current.value = selected.id;
            }
            if (selected.name != null) {
                this.church.current.value = selected.name;
            }
        }

        this.setState({
            searchChurch: false
        });


    }

    handleClear(event) {
        this.context.removeSelection();
    }

    handleDelete(appctx, event) {
        let url     = "/api/user";
        let config = {
            headers: {
                'Authorization': 'Bearer ' + appctx.jwt,
            }
        }

        if (this.context.selection != null) {
            url = url + "/" + this.context.selected.id;

            axios
                .delete(url, config)
                .then(this.handleResponse)
                .catch(function(error) {
                	alert("Error: " + error);
                })
                .then(function() {
                });
        }
    }


    handleSubmit(appctx, event) {
        event.preventDefault();

        let url     = "/api/user";
        let roles   = Array.from(this.roles.current)
                                .filter(option => option.selected)
                                .map(option => option.value);
        let payload = {
            "active": this.active.current.checked,
            "name": this.name.current.value,
            "token": this.token.current.value,
            "roles": roles.join(),
            "churchId": this.churchId.current.value,
        };
        let config = {
            headers: {
                'Authorization': 'Bearer ' + appctx.jwt,
                'Content-Type': 'application/json'
            }
        }

        if (this.context.selection == null) {
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
            payload.id = this.context.selected.id;
            url = url + "/" + payload.id;

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
             this.context.datasourceUpdated();
             this.clear.current.click();
     	}
     	else {
     	    alert("Not Success: " + JSON.stringify(response));
     	}
    }


    render() {
        const ctx   = this.context;
        // alert("UserEditor: render: " + this.state.searchChurch);

        return (
            <AppContext.Consumer>{
                appctx =>
                <div className="editor">

                    <SearchChurchModal status={this.state.searchChurch} closeHandler={this.closeSearchChurchModal.bind(this)} />
                    <form className="editor-form" onSubmit={this.handleSubmit.bind(this, appctx)}>
                        <label for="active"> Active </label>
                        <input id="active" type="checkbox" name="active" ref={this.active} />

                        <label for="name" className="keep-together"> User Name* </label>
                        <input id="name" required="true" type="text" name="name" ref={this.name} />

                        <label for="token" className="keep-together"> User Token* </label>
                        <input id="token" required="true" type="password" name="token" ref={this.token} />

                        <label for="roles" className="keep-together"> User Roles* </label>
                        <select id="roles" multiple="true" required="true" ref={this.roles}>
                            {UserRoles(appctx.apiCaller)}
                        </select>

                        <label for="church" className="keep-together"> User Church* </label>
                        <input id="church" required="true" type="text" readonly="readonly"
                                onClick={this.openSearchChurchModal.bind(this)} ref={this.church} />
                        <input id="churchId" type="hidden" ref={this.churchId} />

                        <label for="createdby"> Created By </label>
                        <input id="createdby" readonly="readonly" type="text" name="createdby" value={ctx.selected.createdBy} />

                        <label for="createddate"> Created Date </label>
                        <input id="createddate" readonly="readonly" type="text" name="createddate" value={ctx.selected.createdDate} />

                        <label for="updatedby"> Updated By </label>
                        <input id="updatedby" readonly="readonly" type="text" name="updatedby" value={ctx.selected.updatedBy} />

                        <label for="updateddate"> Updated Date </label>
                        <input id="updateddate" readonly="readonly" type="text" name="updateddate" value={ctx.selected.updatedDate}/>

                        <div>
                            <input className="login-button" type="submit" value="Save" />
                            <button className="login-button" type="reset" onClick={this.handleClear.bind(this)} ref={this.clear} >Clear</button>
                            <button className="login-button" type="reset" onClick={this.handleDelete.bind(this, appctx)} >Delete</button>
                       </div>
                    </form>
                </div>
            }
            </AppContext.Consumer>
        );
    }
}



export default UserEditor;
