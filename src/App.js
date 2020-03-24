import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserContext from './AppContext.js';
import AppHeader from './AppHeader.js';
import AppFooter from './AppFooter.js';
import AppMenu from './AppMenu.js';
import AppBody from './AppBody.js';

const LEFT_PAGE = '<<<';
const RIGHT_PAGE = '>>>';
class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateUser = (username, jwt) => {
            this.setState(state => ({
                username:   username,
                jwt:        jwt
            }));
        };

        this.updateApiCaller = (apiCaller) => {
            this.setState(state => ({
                apiCaller: apiCaller
            }));
        }

        this.updateAppContent = (appContent) => {
            this.setState(state => ({
                appContent: appContent
            }));
        }

        this.state = {
            updateUser:         this.updateUser,
            updateApiCaller:    this.updateApiCaller,
            updateAppContent:   this.updateAppContent
        };
    }



    render() {

        return (
            <div className="App">
                <UserContext.Provider value={this.state}>
                    <AppHeader/>
                    <AppBody/>
                    <AppFooter/>
                </UserContext.Provider>
            </div>
        );
    }
}

export default App;
