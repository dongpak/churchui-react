import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserContext from './AppContext.js';


const axios     = require('axios').default;
const LEFT_PAGE = '<<<';
const RIGHT_PAGE = '>>>';




class Paginator extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            page: props.page
        }

        //this.handleResponse = this.handleResponse.bind(this);

        //alert("Paginator");
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
    }

    handleMoveLeft() {
    }

    handleClick() {
    }


    render() {

        const pageNumber    = this.state.page == null ? 0 : this.state.page.pageNumber;
        const totalPages    = this.state.page == null ? 10 : this.state.page.totalPages == 0 ? 10 : this.state.page.totalPages;
        const pagination    = this.computePagination(pageNumber, totalPages);

        return (
            <div className="paginator">
            <ul class="pagination">
            {
                    pagination.map((page, index) => {
                        if (page === LEFT_PAGE) {
                            return (
                            <li key={index} className="page-item">
                                <a className="page-link" aria-label="Previous" onClick={this.handleMoveLeft}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            );
                        }

                        if (page === RIGHT_PAGE) {
                            return (
                            <li key={index} className="page-item">
                                <a className="page-link" aria-label="Next" onClick={this.handleMoveRight}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                            );
                        }

                        return (
                            <li key={index} className={`page-item${ pageNumber+1 === page ? ' active' : ''}`}>
                                <a className="page-link" href="#" onClick={ this.handleClick(page) }>{ page }</a>
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
