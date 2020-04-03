import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import {UserContext} from './UserContext.js';
import SortDirection from '../filtersort/SortDirection.js';
import SearchChurchModal from '../church/SearchChurchModal.js';
import UserRoles from './UserRoles.js';



class UserFilterSort extends React.Component {

    static contextType = UserContext;


    constructor(props) {
        super(props);

        this.activeLike = React.createRef();
        this.activeSort = React.createRef();
        this.nameLike   = React.createRef();
        this.nameSort   = React.createRef();
        this.rolesLike  = React.createRef();
        this.rolesSort  = React.createRef();
        this.church     = React.createRef();
        this.churchId   = React.createRef();

        this.clear      = React.createRef();

        this.state = {
            searchChurch:   false
        }

        // alert("UserFilterSort: constructor: " +  JSON.stringify(this.props));
    }

    componentDidUpdate () {
        const filterSort = this.context.filterSort;

        if (filterSort != null) {
            this.activeLike.current.checked = true;
            if ((typeof filterSort.activeLike !== "undefined") && (filterSort.activeLike !== null)) {
                this.activeLike.current.checked = filterSort.activeLike;
            }
            if ((typeof filterSort.activeSort !== "undefined") && (filterSort.activeSort !== null)) {
                this.activeSort.current.value = filterSort.activeSort;
            }

            if ((typeof filterSort.nameLike !== "undefined") && (filterSort.nameLike !== null)) {
                this.nameLike.current.value = filterSort.nameLike;
            }
            if ((typeof filterSort.nameSort !== "undefined") && (filterSort.nameSort !== null)) {
                this.nameSort.current.value = filterSort.nameSort;
            }

            if ((typeof filterSort.rolesLike !== "undefined") && (filterSort.rolesLike !== null)) {
                this.rolesLike.current.value = filterSort.rolesLike;
            }
            if ((typeof filterSort.rolesSort !== "undefined") && (filterSort.rolesSort !== null)) {
                this.rolesSort.current.value = filterSort.rolesSort;
            }

            if ((typeof filterSort.church !== "undefined") && (filterSort.church !== null)) {
                this.church.current.value   = filterSort.church;
                this.churchId.current.value = filterSort.churchId;
            }
        }
    }

    openSearchChurchModal(event) {
        this.setState({
            searchChurch: true
        });
    }

    closeSearchChurchModal(churchctx, event) {
        const selection = churchctx.selection;
        const selected  = churchctx.selected;

        if (selection != null) {
            if (selected.id != null) {
                this.churchId.current.value = selected.id;
            }
            if (selected.name != null) {
                this.church.current.value = selected.name;
            }

            churchctx.removeSelection();
        }

        this.setState({
            searchChurch: false
        });
    }

    handleClear(event) {
    }


    handleSubmit(event) {
        event.preventDefault();

        const   churchId = this.church.current.value === "" ? null : this.churchId.current.value;

        this.context.updateFilterSort({
            activeLike: this.activeLike.current.checked,
            activeSort: this.getSortDirection(this.activeSort),
            nameLike:   this.getStringValue(this.nameLike),
            nameSort:   this.getSortDirection(this.nameSort),
            rolesLike:  this.getStringValue(this.rolesLike),
            rolesSort:  this.getSortDirection(this.rolesSort),
            church:     this.getStringValue(this.church),
            churchId:   churchId
        });
    }

    getSortDirection(ref) {
        return ref.current.value === "NONE" ? null : ref.current.value;
    }

    getStringValue(ref) {
        return ref.current.value === "" ? null : ref.current.value;
    }

    render() {
        const ctx           = this.context;
        const status        = this.props.status;
        const modalState    = status ? "modal modal-on" : "modal modal-off";

        return (
            <AppContext.Consumer>{
            appctx =>
                <div className={modalState}>
                    <section className="modal-main">
                        <div className="modal-menu">
                            <span className="modal-title"> Filter and Sort </span>
                            <span className="modal-button">
                                <button className="modal-close-button" onClick={() => this.props.closeHandler(ctx)} > X </button>
                            </span>
                        </div>
                        <div className="modal-body">
                            <SearchChurchModal status={this.state.searchChurch} closeHandler={this.closeSearchChurchModal.bind(this)} />
                            <form className="editor-form" onSubmit={this.handleSubmit.bind(this)}>
                                <label htmlFor="active"> Active </label>
                                <input id="active" type="checkbox" name="active" ref={this.activeLike} />

                                <label htmlFor="activeSort"> Acitve Sort </label>
                                <select id="activeSort" ref={this.activeSort}>
                                    {SortDirection("ChurchSortActive-", ctx.filterSort.activeSort)}
                                </select>

                                <label htmlFor="name" className="keep-together"> User Name Like </label>
                                <input id="name" type="text" name="name" size="48" ref={this.nameLike} />

                                <label htmlFor="nameSort"> User Name Sort </label>
                                <select id="nameSort" ref={this.nameSort}>
                                    {SortDirection("UserSortName-", ctx.filterSort.nameSort)}
                                </select>

                                <label htmlFor="roles" className="keep-together"> User Roles </label>
                                <select id="roles" multiple="multiple" ref={this.rolesLike}>
                                    {UserRoles(appctx.apiCaller, ctx.filterSort.rolesLike)}
                                </select>

                                <label htmlFor="roleSort"> User Roles Sort </label>
                                <select id="roleSort" ref={this.rolesSort}>
                                    {SortDirection("UserSortRole-", ctx.filterSort.rolesSort)}
                                </select>

                                <label htmlFor="church" className="keep-together"> User Church </label>
                                <input id="church" type="text" readOnly="readonly"
                                        onClick={this.openSearchChurchModal.bind(this)} ref={this.church} />
                                <input id="churchId" type="hidden" ref={this.churchId} />

                                <div>
                                    <input className="login-button" type="submit" value="Save" />
                                    <button className="login-button" type="reset" onClick={this.handleClear.bind(this)} ref={this.clear} >Clear</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            }
            </AppContext.Consumer>
        );
    }
}



export default UserFilterSort;
