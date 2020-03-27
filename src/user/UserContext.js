import React from 'react';


export const UserContext = React.createContext();


export class UserContextProvider extends React.Component {

    constructor(props) {
        super(props);

        this.updateSelection = (selection, selected) => {
            this.setState({
                selection:  selection,
                selected:   selected
            });
        };

        this.removeSelection = () => {
            this.setState({
                selection:  null,
                selected:   {}
            });
        }

        this.datasourceUpdated = () => {
            this.setState({
                refresh: true
            });
        }

        this.datasourceClear = () => {
            this.setState({
                refresh: false
            });
        }

        this.state = {
            refresh:            false,
            selection:          null,
            selected:           {},
            updateSelection:    this.updateSelection,
            removeSelection:    this.removeSelection,
            datasourceUpdated:  this.datasourceUpdated,
            datasourceClear:    this.datasourceClear,
        };
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}


export default function useUserContext() {
    const context = React.useContext(UserContext)

    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContextProvider')
    }

    return context
}

