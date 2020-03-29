import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';

import { PaginatorContext, PaginatorContextProvider } from '../paginator/PaginatorContext.js';
import Paginator from '../paginator/Paginator.js';

import { ChurchContextProvider, ChurchContext } from './ChurchContext.js';
import ChurchEditor from './ChurchEditor.js';
import ChurchTable from './ChurchTable.js';



class ManageChurch extends React.Component {

    static contextType = AppContext;

    render() {

        return (
            <ChurchContextProvider>
            <PaginatorContextProvider>
                <div class="Church-content">
                    <ChurchEditor />
                    <ChurchContext.Consumer>{
                        ctx =>
                        <Paginator ctx={ctx} />
                    }
                    </ChurchContext.Consumer>
                    <PaginatorContext.Consumer>{
                        pagectx =>
                        <ChurchTable appctx={this.context} pagectx={pagectx} />
                    }
                    </PaginatorContext.Consumer>
                </div>
            </PaginatorContextProvider>
            </ChurchContextProvider>
        );
    }
}

export default ManageChurch;
