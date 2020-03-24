import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserContext from './AppContext.js';
import ManageChurch from './church/ManageChurch.js'



class AppContent extends React.Component {

    static contextType = UserContext;


    render() {
        return (
            <div class="App-content">
                <AppSelectedContent name={this.context.appContent} />
            </div>
        );
    }
}

function AppSelectedContent(props) {

    if (props.name == "Manage Churches") {
        return <ManageChurch/>
    }

    return (
        <p> Selected menu - {props.name} </p>
    );
}

export default AppContent;
