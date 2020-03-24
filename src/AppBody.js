import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserContext from './AppContext.js';
import AppMenu from './AppMenu.js';
import AppContent from './AppContent.js';
import AppAds from './AppAds.js';


class AppBody extends React.Component {

    static contextType = UserContext;

    render() {
        return (
            <div className="App-body">
                <AppMenu/>
                <AppContent/>
                <AppAds/>
            </div>
        );
    }
}

export default AppBody;
