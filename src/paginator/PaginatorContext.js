import React from 'react';


export const PaginatorContext = React.createContext();


export class PaginatorContextProvider extends React.Component {

    constructor(props) {
        super(props);

        this.updateSelection = (totalPages, currentPage) => {
            this.setState({
                totalPages:     totalPages,
                currentPage:    currentPage
            });
        };

        this.resetSelection = () => {
            this.setState({
                totalPages:         0,
                currentPage:        0,
            });
        }

        this.state = {
            totalPages:         0,
            currentPage:        0,
            updateSelection:    this.updateSelection,
            resetSelection:     this.resetSelection,
        };
    }

    render() {
        return (
            <PaginatorContext.Provider value={this.state}>
                {this.props.children}
            </PaginatorContext.Provider>
        );
    }
}


export default function usePaginatorContext() {
    const context = React.useContext(PaginatorContext)

    if (context === undefined) {
        throw new Error('usePaginatorContext must be used within a PaginatorContextProvider')
    }

    return context
}
