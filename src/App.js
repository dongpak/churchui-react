import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserContext from './AppContext.js';
import AppHeader from './AppHeader.js';
import AppLogin from './AppLogin.js';



class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateUser = (username, jwt) => {
            this.setState(state => ({
                username: username,
                jwt: jwt
            }));
        };

        this.state = {
            username: null,
            updateUser: this.updateUser
        };
    }

    render() {
        return (
            <div className="App">
                <AppHeader/>
                <UserContext.Provider value={this.state}>
                    <AppLogin jwt={this.state.jwt}/>
                </UserContext.Provider>
            </div>
        );
    }
}

export default App;
