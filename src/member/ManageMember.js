import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';

import { PaginatorContext, PaginatorContextProvider } from '../paginator/PaginatorContext.js';
import Paginator from '../paginator/Paginator.js';

import { MemberContextProvider, MemberContext } from './MemberContext.js';
import MemberEditor from './MemberEditor.js';
import MemberTable from './MemberTable.js';



class ManageMember extends React.Component {

    static contextType = AppContext;

    render() {

        return (
            <MemberContextProvider>
            <PaginatorContextProvider>
                <div class="Church-content">
                    <MemberEditor />
                    <MemberContext.Consumer>{
                        ctx =>
                        <Paginator ctx={ctx} />
                    }
                    </MemberContext.Consumer>
                    <PaginatorContext.Consumer>{
                        pagectx =>
                        <MemberTable appctx={this.context} pagectx={pagectx} />
                    }
                    </PaginatorContext.Consumer>
                </div>
            </PaginatorContextProvider>
            </MemberContextProvider>
        );
    }
}

export default ManageMember;
