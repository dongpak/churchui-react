import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AppContext from './AppContext.js'



class AppFooter extends React.Component {
    static contextType = AppContext;

    render() {
        return (
            <div className="App-footer">
                <h5>© 2020 churchclerk.com</h5>
            </div>
        );
    }
}



export default AppFooter;
