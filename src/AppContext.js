import React from 'react';


const AppContext = React.createContext();
export default AppContext;


export class AppContextProvider extends React.Component {

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
            username:           null,
            jwt:                null,
            updateUser:         this.updateUser,

            apiCaller:          null,
            updateApiCaller:    this.updateApiCaller,

            appContent:         null,
            updateAppContent:   this.updateAppContent
        };
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}


export function useAppContext() {
    const context = React.useContext(AppContext)

    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }

    return context
}
