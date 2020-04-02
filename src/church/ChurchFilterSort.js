import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import {ChurchContext} from './ChurchContext.js';
import SortDirection from '../filtersort/SortDirection.js';


const axios     = require('axios').default;



class ChurchFilterSort extends React.Component {

    static contextType = ChurchContext;


    constructor(props) {
        super(props);

        this.activeLike = React.createRef();
        this.activeSort = React.createRef();
        this.nameLike   = React.createRef();
        this.nameSort   = React.createRef();

        this.clear      = React.createRef();

        // alert("ChurchFilterSort: constructor: " +  JSON.stringify(this.props));
    }

    componentDidUpdate () {
        const filterSort = this.context.filterSort;

        if (filterSort != null) {
            this.activeLike.current.checked = "checked";
            if ((typeof filterSort.activeLike !== "undefined") && (filterSort.activeLike !== null)) {
                this.activeLike.current.checked = filterSort.activeLike === true ? "checked" : "";
            }
            if ((typeof filterSort.activeSort !== "undefined") && (filterSort.activeSort !== null)) {
                this.activeSort.current.value = filterSort.activeSort;
            }

            if ((typeof filterSort.nameLike !== "undefined") && (filterSort.nameLike != null)) {
                this.nameLike.current.value = filterSort.nameLike;
            }
            if ((typeof filterSort.nameSort !== "undefined") && (filterSort.nameSort != null)) {
                this.nameSort.current.value = filterSort.nameSort;
            }
        }
    }

    handleClear(event) {
    }


    handleSubmit(event) {
        event.preventDefault();

        this.context.updateFilterSort({
            activeLike: this.activeLike.current.checked,
            activeSort: this.activeSort.current.value === "NONE" ? null : this.activeSort.current.value,
            nameLike:   this.nameLike.current.value === "" ? null : this.nameLike.current.value,
            nameSort:   this.nameSort.current.value === "NONE" ? null : this.nameSort.current.value
        });
    }


    render() {
        const ctx           = this.context;
        const status        = this.props.status;
        const modalState    = status ? "modal modal-on" : "modal modal-off";

        return (
            <div className={modalState}>
                <section className="modal-main">
                    <div className="modal-menu">
                        <span className="modal-title"> Filter and Sort </span>
                        <span className="modal-button">
                            <button className="modal-close-button" onClick={() => this.props.closeHandler(ctx)} > X </button>
                        </span>
                    </div>
                    <div className="modal-body">
                        <form className="editor-form" onSubmit={this.handleSubmit.bind(this)}>
                            <label htmlFor="active"> Active </label>
                            <input id="active" type="checkbox" name="active" ref={this.activeLike} />

                            <label htmlFor="activeSort"> Acitve Sort </label>
                            <select id="activeSort" ref={this.activeSort}>
                                {SortDirection("ChurchSortActive-", ctx.filterSort.activeSort)}
                            </select>

                            <label htmlFor="name" className="keep-together"> Church Name Like </label>
                            <input id="name" type="text" name="name" size="48" ref={this.nameLike} />

                            <label htmlFor="nameSort"> Church Name Sort </label>
                            <select id="nameSort" ref={this.nameSort}>
                                {SortDirection("ChurchSortName-", ctx.filterSort.nameSort)}
                            </select>

                            <div>
                                <input className="login-button" type="submit" value="Save" />
                                <button className="login-button" type="reset" onClick={this.handleClear.bind(this)} ref={this.clear} >Clear</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}



export default ChurchFilterSort;
