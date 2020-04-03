import React from 'react';


export const MemberContext = React.createContext();


export class MemberContextProvider extends React.Component {

    constructor(props) {
        super(props);

        this.updateFilterSort = (filterSort) => {
            this.setState({
                filterSort: filterSort
            });
        };

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
            filterSort:         {},
            refresh:            false,
            selection:          null,
            selected:           {},

            updateFilterSort:   this.updateFilterSort,
            updateSelection:    this.updateSelection,
            removeSelection:    this.removeSelection,
            datasourceUpdated:  this.datasourceUpdated,
            datasourceClear:    this.datasourceClear,
        };
    }

    render() {
        return (
            <MemberContext.Provider value={this.state}>
                {this.props.children}
            </MemberContext.Provider>
        );
    }
}


export default function useMemberContext() {
    const context = React.useContext(MemberContext)

    if (context === undefined) {
        throw new Error('useMemberContext must be used within a MemberContextProvider')
    }

    return context
}
