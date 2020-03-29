import React from 'react';
import '../App.css';
import { PaginatorContext } from './PaginatorContext.js';


const LEFT_PAGE = '<<<';
const RIGHT_PAGE = '>>>';




class Paginator extends React.Component {

    static contextType = PaginatorContext;

    constructor(props) {
        super(props);

        this.numberRange            = this.numberRange.bind(this);
        this.computePagination      = this.computePagination.bind(this);
        this.getCurrentPage         = this.getCurrentPage.bind(this);
        this.getTotalPages          = this.getTotalPages.bind(this);
        this.refreshOtherContext    = this.refreshOtherContext.bind(this);

        console.log("Paginator:constructor");
    }


    numberRange (start, end) {
        return new Array(end - start).fill().map((d, i) => i + start);
    }

    computePagination(pageNumber, totalPages) {

        if (totalPages <= 10) {
            return this.numberRange(1, totalPages+1);
        }

        if (pageNumber <= 4) {
            return this.numberRange(1, 10).concat([RIGHT_PAGE]);
        }

        let startPage   = pageNumber - 4;
        let endPage     = pageNumber + 5;

        if (endPage < totalPages) {
            return [LEFT_PAGE].concat(this.numberRange(startPage, endPage).concat([RIGHT_PAGE]));
        }

        return [LEFT_PAGE].concat(this.numberRange(startPage, totalPages));
    }

    handleMoveRight() {
        const pageNumber    = this.getCurrentPage();
        const totalPages    = this.getTotalPages();

        if (pageNumber < totalPages) {
            this.context.updateSelection(totalPages, pageNumber + 1);
            this.refreshOtherContext();
        }
    }

    refreshOtherContext() {
        //alert("Paginator: refreshOtherContext");

        const ctx   = this.props.ctx;

        if ((typeof ctx !== "undefined" ) && (ctx !== null)) {
            ctx.datasourceUpdated();
        }
    }

    handleMoveLeft() {
        const pageNumber    = this.getCurrentPage();
        const totalPages    = this.getTotalPages();

        if (pageNumber > 1) {
            this.context.updateSelection(totalPages, pageNumber - 1);
            this.refreshOtherContext();
        }
    }

    handleClick(page) {
        const pageNumber    = this.getCurrentPage();
        const totalPages    = this.getTotalPages();

        if (pageNumber !== (page - 1)) {
            this.context.updateSelection(totalPages, (page-1));
            this.refreshOtherContext();
        }
    }

    getCurrentPage() {
        if (this.context.currentPage === null) {
            return 0;
        }

        return this.context.currentPage;
    }

    getTotalPages() {
        if (this.context.totalPages === null) {
            return 10;
        }

        if (this.context.totalPages < 10) {
            return 10;
        }

        return this.context.totalPages;
    }

    render() {

        const pageNumber    = this.getCurrentPage();
        const totalPages    = this.getTotalPages();
        const pagination    = this.computePagination(pageNumber, totalPages);

        //alert("Paginator: render: page=" + pageNumber);
        return (
            <div className="paginator">
                <ul class="pagination">
                {
                    pagination.map((page, index) => {
                        if (page === LEFT_PAGE) {
                            return (
                            <li key={index} className="page-item">
                                <button className="page-link" onClick={this.handleMoveLeft.bind(this)}>
                                    Previous
                                </button>
                            </li>
                            );
                        }

                        if (page === RIGHT_PAGE) {
                            return (
                            <li key={index} className="page-item">
                                <button className="page-link" onClick={this.handleMoveRight.bind(this)}>
                                    Next
                                </button>
                            </li>
                            );
                        }

                        return (
                            <li key={index} className={`page-item${ pageNumber+1 === page ? ' active' : ''}`}>
                                <button className="page-link" onClick={ this.handleClick.bind(this, page) }>
                                    { page }
                                </button>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
}


export default Paginator;
