import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';

import { PaginatorContext, PaginatorContextProvider } from '../paginator/PaginatorContext.js';
import Paginator from '../paginator/Paginator.js';

import { ChurchContext } from './ChurchContext.js';
import ChurchTable from './ChurchTable.js';



export default class SearchUser extends React.Component {

    static contextType = AppContext;


    render() {
        const status        = this.props.status;
        const modalState    = status ? "modal modal-on" : "modal modal-off";

        return (
            <div className={modalState}>
                <section className="modal-main">
                    <PaginatorContextProvider>
                        <ChurchContext.Consumer>{
                            churchctx =>
                            <button onClick={() => this.props.closeHandler(churchctx)} > Close </button>
                        }
                        </ChurchContext.Consumer>
                        <Paginator />
                        <PaginatorContext.Consumer>{
                            pagectx =>
                            <ChurchTable appctx={this.context} pagectx={pagectx} />
                        }
                        </PaginatorContext.Consumer>
                    </PaginatorContextProvider>
                </section>
            </div>
        );
    }
}


