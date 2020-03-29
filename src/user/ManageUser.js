import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';

import { PaginatorContext, PaginatorContextProvider } from '../paginator/PaginatorContext.js';
import Paginator from '../paginator/Paginator.js';
import { ChurchContextProvider } from '../church/ChurchContext.js';

import { UserContextProvider, UserContext } from './UserContext.js';
import UserEditor from './UserEditor.js';
import UserTable from './UserTable.js';


class ManageUser extends React.Component {

    static contextType = AppContext;

    render() {
        return (
            <UserContextProvider>
            <PaginatorContextProvider>
                <div class="Church-content">
                    <ChurchContextProvider>
                        <UserEditor appctx={this.context} />
                    </ChurchContextProvider>
                    <UserContext.Consumer>{
                        ctx =>
                        <Paginator ctx={ctx}/>
                    }
                    </UserContext.Consumer>
                    <PaginatorContext.Consumer>{
                        pagectx =>
                        <UserTable appctx={this.context} pagectx={pagectx} />
                    }
                    </PaginatorContext.Consumer>
                </div>
            </PaginatorContextProvider>
            </UserContextProvider>
        );
    }
}
/*

*/
export default ManageUser;
