import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import UserContext from '../AppContext.js';
import ChurchContext from './ChurchContext.js';

import Paginator from '../Paginator.js';
import ChurchTable from './ChurchTable.js';
import ChurchEditor from './ChurchEditor.js';


const axios     = require('axios').default;





class ManageChurch extends React.Component {

    static contextType = UserContext;



    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);


        this.updateSelection = (index, selected) => {
            this.setState(state => ({
                selection:  index,
                selected:   selected
            }));
        }

        this.state = {
            page:       null,
            selection:  null,
            selected:   {},

            updateSelection: this.updateSelection
        }
    }

    componentDidMount() {
        axios
            .get("/api/church?active=true", {
                headers: {'Authorization': 'Bearer ' + this.context.jwt},
    		})
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
                page: response.data
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
            <ChurchContext.Provider value={this.state}>
                <div class="Church-content">
                    <ChurchEditor churchContext={this.state} />
                    <Paginator page={this.state.page} />
                    <ChurchTable page={this.state.page}/>
                </div>
            </ChurchContext.Provider>
        );
    }
}


export default ManageChurch;
