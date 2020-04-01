import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import {MemberContext} from './MemberContext.js';



const axios     = require('axios').default;



class MemberEditor extends React.Component {

    static contextType = MemberContext;


    constructor(props) {
        super(props);

        this.active     = React.createRef();
        this.name       = React.createRef();
        this.otherName  = React.createRef();
        this.startDate  = React.createRef();
        this.endDate    = React.createRef();
        this.regular    = React.createRef();
        this.clear      = React.createRef();

        this.handleResponse = this.handleResponse.bind(this);

        // alert("MemberEditor: constructor: " +  JSON.stringify(this.props));
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
            if (selected.otherName != null) {
                this.otherName.current.value = selected.otherName;
            }
            if (selected.startDate != null) {
                this.startDate.current.value = this.toDateStr(selected.startDate);
            }
            if (selected.endDate != null) {
                this.endDate.current.value = this.toDateStr(selected.endDate);
            }
            if (selected.regular != null) {
                this.regular.current.checked = selected.regular ? "checked" : "";
            }
        }
    }

    toDateStr(isoString) {
        let dateObj = new Date(isoString);
        return dateObj.toISOString().split('T')[0];
    }

    handleClear(event) {
        this.context.removeSelection();
    }

    handleDelete(appctx, event) {
        let url     = "/api/member";
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

        let url         = "/api/member";

        let payload = {
            "active": this.active.current.checked,
            "name": this.name.current.value,
            "otherName": this.otherName.current.value,
            "startDate": this.startDate.current.value,
            "endDate": this.endDate.current.value,
            "regular": this.regular.current.checked
        };
        let config = {
            headers: {
                'Authorization': 'Bearer ' + appctx.jwt,
                'Content-Type': 'application/json'
            }
        }

        console.log("Other Name: " + this.otherName.current.value);

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

                        <label htmlFor="name" className="keep-together"> Member Name* </label>
                        <input id="name" required="true" type="text" name="name" ref={this.name} />

                        <label htmlFor="otherName" className="keep-together"> Other Name* </label>
                        <input id="otherName" required="true" type="text" name="otherName" ref={this.otherName} />

                        <label htmlFor="startDate" className="keep-together"> Start Date* </label>
                        <input id="startDate" required="true" type="date" name="startDate" ref={this.startDate} />

                        <label htmlFor="endDate" className="keep-together"> End Date </label>
                        <input id="endDate" type="date" name="endDate" ref={this.endDate} />

                        <label htmlFor="regular" className="keep-together"> Regular Member* </label>
                        <input id="regular" required="true" type="checkbox" name="regular" ref={this.regular} />

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



export default MemberEditor;
