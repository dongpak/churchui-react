import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import {ChurchContext} from './ChurchContext.js';



const axios     = require('axios').default;



class ChurchEditor extends React.Component {

    static contextType = ChurchContext;


    constructor(props) {
        super(props);

        this.active = React.createRef();
        this.name   = React.createRef();
        this.clear  = React.createRef();

        this.handleResponse = this.handleResponse.bind(this);

        // alert("ChurchEditor: constructor: " +  JSON.stringify(this.props));
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
        }
    }

    handleClear(event) {
        this.context.removeSelection();
    }

    handleDelete(appctx, event) {
        let url     = "/api/church";
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

        let url     = "/api/church";
        let payload = {
            "active": this.active.current.checked,
            "name": this.name.current.value
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
        const ctx = this.context;

        return (
            <AppContext.Consumer>
            {
                appctx =>
                <div className="editor">
                    <form className="editor-form" onSubmit={this.handleSubmit.bind(this, appctx)}>
                        <label htmlFor="active"> Active </label>
                        <input id="active" type="checkbox" name="active" ref={this.active} />

                        <label htmlFor="id"> Id </label>
                        <input id="id" readOnly="readonly" type="text" name="id" value={ctx.selected.id} />

                        <label htmlFor="name" className="keep-together"> Church Name* </label>
                        <input id="name" required="true" type="text" name="name" ref={this.name} />

                        <label htmlFor="createdby"> Created By </label>
                        <input id="createdby" readOnly="readonly" type="text" name="createdby" value={ctx.selected.createdBy} />

                        <label htmlFor="createddate"> Created Date </label>
                        <input id="createddate" readOnly="readonly" type="text" name="createddate" value={ctx.selected.createdDate} />

                        <label htmlFor="updatedby"> Updated By </label>
                        <input id="updatedby" readOnly="readonly" type="text" name="updatedby" value={ctx.selected.updatedBy} />

                        <label htmlFor="updateddate"> Updated Date </label>
                        <input id="updateddate" readOnly="readonly" type="text" name="updateddate" value={ctx.selected.updatedDate}/>

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



export default ChurchEditor;
