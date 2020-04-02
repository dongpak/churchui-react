import React from 'react';


export const ChurchContext = React.createContext();


export class ChurchContextProvider extends React.Component {

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
            <ChurchContext.Provider value={this.state}>
                {this.props.children}
            </ChurchContext.Provider>
        );
    }
}


export default function useChurchContext() {
    const context = React.useContext(ChurchContext)

    if (context === undefined) {
        throw new Error('useChurchContext must be used within a ChurchContextProvider')
    }

    return context
}
