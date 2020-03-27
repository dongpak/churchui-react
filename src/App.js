import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { AppContextProvider } from './AppContext.js';
import AppHeader from './AppHeader.js';
import AppFooter from './AppFooter.js';
import AppBody from './AppBody.js';



class App extends React.Component {

    render() {

        return (
            <AppContextProvider value={this.state}>
                <div className="App">
                    <AppHeader/>
                    <AppBody/>
                    <AppFooter/>
                </div>
            </AppContextProvider>
        );
    }
}

export default App;
