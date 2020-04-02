import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';

import { PaginatorContext, PaginatorContextProvider } from '../paginator/PaginatorContext.js';
import Paginator from '../paginator/Paginator.js';

import { ChurchContext, ChurchContextProvider } from './ChurchContext.js';
import ChurchTable from './ChurchTable.js';



export default class SearchUser extends React.Component {

    static contextType = AppContext;


    render() {
        const status        = this.props.status;
        const modalState    = status ? "modal modal-on" : "modal modal-off";

        return (
            <div className={modalState}>
                <section className="modal-main">
                    <ChurchContextProvider>
                    <PaginatorContextProvider>
                        <div className="modal-menu">
                            <span className="modal-title"> Select Church </span>
                            <span className="modal-button">
                                <ChurchContext.Consumer>{
                                churchctx =>
                                    <button className="modal-close-button" onClick={() => this.props.closeHandler(churchctx)} > X </button>
                                }
                                </ChurchContext.Consumer>
                            </span>
                        </div>
                        <div className="modal-body">
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
                </section>
            </div>
        );
    }
}


