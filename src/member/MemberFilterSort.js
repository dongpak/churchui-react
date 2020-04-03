import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import AppContext from '../AppContext.js';
import {MemberContext} from './MemberContext.js';
import SortDirection from '../filtersort/SortDirection.js';
import SearchChurchModal from '../church/SearchChurchModal.js';



class MemberFilterSort extends React.Component {

    static contextType = MemberContext;


    constructor(props) {
        super(props);

        this.activeLike     = React.createRef();
        this.activeSort     = React.createRef();
        this.nameLike       = React.createRef();
        this.nameSort       = React.createRef();
        this.otherNameLike  = React.createRef();
        this.otherNameSort  = React.createRef();
        this.startDateLike  = React.createRef();
        this.startDateSort  = React.createRef();
        this.endDateLike    = React.createRef();
        this.endDateSort    = React.createRef();
        this.regularLike    = React.createRef();
        this.regularSort    = React.createRef();

        this.church         = React.createRef();
        this.churchId       = React.createRef();

        this.clear          = React.createRef();

        this.state = {
            searchChurch:   false
        }

        // alert("MemberFilterSort: constructor: " +  JSON.stringify(this.props));
    }

    componentDidUpdate () {
        const filterSort = this.context.filterSort;

        if (filterSort != null) {
            this.activeLike.current.checked = true;
            this.updateCheckBoxRefWithFilterSort(this.activeLike, filterSort.activeLike);
            this.updateRefWithFilterSort(this.activeSort, filterSort.activeSort);

            this.updateRefWithFilterSort(this.nameLike, filterSort.nameLike);
            this.updateRefWithFilterSort(this.nameSort, filterSort.nameSort);
            this.updateRefWithFilterSort(this.otherNameLike, filterSort.otherNameLike);
            this.updateRefWithFilterSort(this.otherNameSort, filterSort.otherNameSort);
            this.updateRefWithFilterSort(this.startDateLike, filterSort.startDateLike);
            this.updateRefWithFilterSort(this.startDateSort, filterSort.startDateSort);
            this.updateRefWithFilterSort(this.endDateLike, filterSort.endDateLike);
            this.updateRefWithFilterSort(this.endDateSort, filterSort.endDateSort);

            this.regularLike.current.checked = true;
            this.updateCheckBoxRefWithFilterSort(this.regularLike, filterSort.regularLike);
            this.updateRefWithFilterSort(this.regularSort, filterSort.regularSort);

            if ((typeof filterSort.church !== "undefined") && (filterSort.church !== null)) {
                this.church.current.value   = filterSort.church;
                this.churchId.current.value = filterSort.churchId;
            }
        }
    }

    updateCheckBoxRefWithFilterSort(ref, value) {
        if ((typeof value !== "undefined") && (value !== null)) {
            ref.current.checked = value;
        }
    }

    updateRefWithFilterSort(ref, value) {
        if ((typeof value !== "undefined") && (value !== null)) {
            ref.current.value = value;
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
            activeLike:     this.activeLike.current.checked,
            activeSort:     this.getSortDirection(this.activeSort),
            nameLike:       this.getStringValue(this.nameLike),
            nameSort:       this.getSortDirection(this.nameSort),
            otherNameLike:  this.getStringValue(this.otherNameLike),
            otherNameSort:  this.getSortDirection(this.otherNameSort),
            startDateLike:  this.getStringValue(this.startDateLike),
            startDateSort:  this.getSortDirection(this.startDateSort),
            endDateLike:    this.getStringValue(this.endDateLike),
            endDateSort:    this.getSortDirection(this.endDateSort),
            regularLike:    this.regularLike.current.checked,
            regularSort:    this.getSortDirection(this.regularSort),

            church:         this.getStringValue(this.church),
            churchId:       churchId
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
                                    {SortDirection("MemberSortActive-", ctx.filterSort.activeSort)}
                                </select>

                                <label htmlFor="name" className="keep-together"> Member Name Like </label>
                                <input id="name" type="text" name="name" size="48" ref={this.nameLike} />

                                <label htmlFor="nameSort"> Member Name Sort </label>
                                <select id="nameSort" ref={this.nameSort}>
                                    {SortDirection("MemberSortName-", ctx.filterSort.nameSort)}
                                </select>

                                <label htmlFor="otherName" className="keep-together"> Other Name Like </label>
                                <input id="otherName" type="text" name="otherName" ref={this.otherNameLike} />

                                <label htmlFor="otherNameSort"> Other Name Sort </label>
                                <select id="otherNameSort" ref={this.otherNameSort}>
                                    {SortDirection("MemberSortOtherName-", ctx.filterSort.otherNameSort)}
                                </select>

                                <label htmlFor="startDate" className="keep-together"> Start Date Like </label>
                                <input id="startDate" type="date" name="startDate" ref={this.startDateLike} />

                                <label htmlFor="startDateSort"> Start Date Sort </label>
                                <select id="startDateSort" ref={this.startDateSort}>
                                    {SortDirection("MemberSortStartDate-", ctx.filterSort.startDateSort)}
                                </select>

                                <label htmlFor="endDate" className="keep-together"> End Date Like </label>
                                <input id="endDate" type="date" name="endDate" ref={this.endDateLike} />

                                <label htmlFor="endDateSort"> End Date Sort </label>
                                <select id="endDateSort" ref={this.endDateSort}>
                                    {SortDirection("MemberSortEndDate-", ctx.filterSort.endDateSort)}
                                </select>

                                <label htmlFor="regular" className="keep-together"> Regular Member </label>
                                <input id="regular" type="checkbox" name="regular" ref={this.regularLike} />

                                <label htmlFor="regularSort"> Regular Member Sort </label>
                                <select id="regularSort" ref={this.regularSort}>
                                    {SortDirection("MemberSortRegular-", ctx.filterSort.regularSort)}
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



export default MemberFilterSort;
