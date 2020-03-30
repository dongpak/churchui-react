import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AppContext from './AppContext.js';



class AppAds extends React.Component {

    static contextType = AppContext;


    render() {
        return (
            <div className="App-ads">
              <p> Space for advertisement.</p>
            </div>
        );
    }
}

export default AppAds;
