import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import UserContext from '../AppContext.js';
import ChurchContext from './ChurchContext.js';



const axios     = require('axios').default;



class ChurchEditor extends React.Component {

    static contextType = UserContext;


    constructor(props) {
        super(props);

        this.active = React.createRef();
        this.name   = React.createRef();
        this.clear  = React.createRef();

        this.handleClear    = this.handleClear.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        //alert("ChurchEditor constructor");
    }

    componentDidUpdate () {
        const selected = this.props.churchContext.selected;

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
        this.props.churchContext.updateSelection(null, {});
    }

    handleSubmit(event) {
        let url     = "/api/church";
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
            payload.id = this.props.churchContext.selected.id;
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
            this.clear.current.click();
    	}
    	else {
    	    alert("Not Success: " + JSON.stringify(response));
    	}
    }

    render() {
        return (
            <ChurchContext.Consumer>
            {context =>
                <div className="editor">
                    <form className="editor-form" onSubmit={this.handleSubmit}>
                        <label for="active"> Active </label>
                        <input id="active" type="checkbox" name="active" ref={this.active} />

                        <label for="id"> Id </label>
                        <input id="id" readonly="readonly" type="text" name="id" value={context.selected.id} />

                        <label for="name" className="keep-together"> Church Name* </label>
                        <input id="name" required="true" type="text" name="name" ref={this.name} />

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
            </ChurchContext.Consumer>
        );
    }
}


export default ChurchEditor;
