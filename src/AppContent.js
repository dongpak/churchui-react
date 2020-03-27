import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AppContext from './AppContext.js';
import ManageChurch from './church/ManageChurch.js';
import ManageUser from './user/ManageUser.js';


class AppContent extends React.Component {

    static contextType = AppContext;

    render() {
        return (
            <div className="App-content">
                <AppSelectedContent name={this.context.appContent} />
            </div>
        );
    }
}

function AppSelectedContent(props) {

    if (props.name === "Manage Churches") {
        return <ManageChurch/>
    }

    if (props.name === "Manage Users") {
        return <ManageUser/>
    }

    return (
        <p> Selected menu - {props.name} </p>
    );
}

export default AppContent;
