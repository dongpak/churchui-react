import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserContext from './AppContext.js'



class AppFooter extends React.Component {
    static contextType = UserContext;

    render() {
        return (
            <div class="App-footer">
                <h2>Footer</h2>
            </div>
        );
    }
}



export default AppFooter;
