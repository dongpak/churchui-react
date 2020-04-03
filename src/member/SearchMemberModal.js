import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';

import { PaginatorContext, PaginatorContextProvider } from '../paginator/PaginatorContext.js';
import Paginator from '../paginator/Paginator.js';

import { MemberContext } from './MemberContext.js';
import MemberTable from './MemberTable.js';



export default class SearchMember extends React.Component {

    static contextType = AppContext;


    render() {
        const status        = this.props.status;
        const modalState    = status ? "modal modal-on" : "modal modal-off";

        return (
            <div className={modalState}>
                <section className="modal-main">
                    <PaginatorContextProvider>
                        <MemberContext.Consumer>{
                        memberctx =>
                            <button onClick={() => this.props.closeHandler(memberctx)} > Close </button>
                        }
                        </MemberContext.Consumer>
                        <Paginator />
                        <PaginatorContext.Consumer>{
                            pagectx =>
                            <MemberTable appctx={this.context} pagectx={pagectx} />
                        }
                        </PaginatorContext.Consumer>
                    </PaginatorContextProvider>
                </section>
            </div>
        );
    }
}


