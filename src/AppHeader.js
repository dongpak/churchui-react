import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserContext from './AppContext.js'



class AppHeader extends React.Component {
    static contextType = UserContext;

    render() {
        return (
            <header className="App-header">
                <h1> Welcome to Church Clerk </h1>
                <HeaderDetail username={this.context.username}/>
            </header>
        );
    }
}


function HeaderDetail(props) {
    if (props.username == null) {
        return (
            <div/>
        );
    }
    else if (props.apiCaller == null) {
        return (
            <p> You have logged in as {props.username} </p>
        );
    }
}


export default AppHeader;
