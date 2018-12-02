import React, { Component } from 'react'
import TenantsTable from './TenantsTable';
import TenantCard from './TenantCard';
import axios from 'axios';
import '../Styling/TenantManagmentPage.css';

export default class TenantManagmentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTenants: [],
            tenantsToShow: [],
            showAllTenants: true,
            showWithDebt: true,
            addOrUpdatePopUp: false,
            newCard: true,
            token: "",
            searchTerm: "",
            tenantToShowOnCard: {},
            username: this.props.username
        }
        //get the searchTerm and search tenants that includes the searchTerm the user entered
        this.searchTenantByName = this.searchTenantByName.bind(this);
        //change the list of tenants by user's filter 
        this.changeTenantsToShow = this.changeTenantsToShow.bind(this);
        //when user wants to add new tenant it will open pop up card to fill
        this.showNewTenantCard = this.showNewTenantCard.bind(this);
        //get all tenants from server by get request and update the state
        this.getAllTenantsFromServer = this.getAllTenantsFromServer.bind(this);
        //when user wants to update tenant it will open pop up card with the tenant's data
        this.showExistingTenantCard = this.showExistingTenantCard.bind(this);
        //when user add/update tenant this function will update the DB with the new data
        this.updateDB = this.updateDB.bind(this);
        // delete request to delete tenant from DB 
        this.deleteTenantById = this.deleteTenantById.bind(this);
        // change the list of tenants to show to a new list with tenant with no dubts only
        this.tenantsWithNoDubts = this.tenantsWithNoDubts.bind(this);
        // change the list of tenants to show to a new list with tenant with dubts only
        this.tenantsWithDubts = this.tenantsWithDubts.bind(this);
        this.closeTenantCard = this.closeTenantCard.bind(this);
        //check all the parameters to see which list of tenants should show on screen
        this.checkWhatToShow = this.checkWhatToShow.bind(this);
        //sign out the user - write to log and return to login page
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.setState({ token: this.props.token }, this.getAllTenantsFromServer);
        // set apptoken header for all axios requests
        axios.defaults.headers.common['apptoken'] = this.props.token
    }

    getAllTenantsFromServer() {
        axios.get('http://localhost:3000/tenant')
            .then((res) => {
                this.setState({ allTenants: res.data.data });
                this.checkWhatToShow();
            }).catch((err) => { console.log(err); alert("something is wrong") });
    }

    checkWhatToShow() {
        if (this.state.showAllTenants) {
            this.setState({ tenantsToShow: this.state.allTenants });
        }
        else {
            let newList = [];
            if (this.state.showWithDebt) {
                this.tenantsWithDubts(newList);
            }
            else {
                this.tenantsWithNoDubts(newList);
            }
            this.setState({ tenantsToShow: newList });
        }
    }

    searchTenantByName() {
        const text = this.state.searchTerm;
        let newList = [];
        this.state.tenantsToShow.map((tenant) =>
            tenant.name.includes(text) ?
                newList.push(tenant) : null
        );
        this.setState({ tenantsToShow: newList });
    }

    changeTenantsToShow(e) {
        this.setState({ searchTerm: "" });
        let newList = [];
        switch (e.target.value) {
            case "All":
                {
                    this.setState({ showAllTenants: true })
                    newList = this.state.allTenants;
                    break;
                }
            case "With Debts":
                {
                    this.setState({ showWithDebt: true })
                    this.tenantsWithDubts(newList);
                    this.setState({ showAllTenants: false })
                    break;
                }
            case "No Debts":
                {
                    this.setState({ showWithDebt: false })
                    this.tenantsWithNoDubts(newList);
                    this.setState({ showAllTenants: false })
                    break;
                }
            default:
                {
                    break;
                }
        }
        this.setState({ tenantsToShow: newList });
    }

    tenantsWithDubts(list) {
        this.state.allTenants.map((tenant) => {
            if (tenant.financial_debt > 0) {
                list.push(tenant);
            }
        });
    }

    tenantsWithNoDubts(list) {
        this.state.allTenants.map((tenant) => {
            if (tenant.financial_debt === 0) {
                list.push(tenant);
            }
        });
    }

    showNewTenantCard() {
        this.setState({ addOrUpdatePopUp: true, newCard: true });
    }

    showExistingTenantCard(tenantId) {
        this.state.tenantsToShow.map((tenant) =>
            tenant._id === tenantId ?
                this.setState({
                    tenantToShowOnCard: tenant,
                    addOrUpdatePopUp: true,
                    newCard: false
                }) : null);
    }

    deleteTenantById(tenantId) {
        axios.delete('http://localhost:3000/tenant', { data: { tenantId } })
            .then((res) => {
                alert("tenant was deleted!");
                this.getAllTenantsFromServer();
            }).catch((err) => { console.log(err); alert("something is wrong") });
    }

    updateDB(isNew, tenant) {
        if (isNew) {
            axios.post('http://localhost:3000/tenant', tenant)
                .then((res) => {
                    alert("tenant was added!");
                    this.getAllTenantsFromServer();
                }).catch((err) => { console.log(err); alert("something is wrong") });
        }
        else {
            axios.post('http://localhost:3000/tanent/updateTenant', tenant)
                .then((res) => {
                    alert("tenant was updated!");
                    this.getAllTenantsFromServer();
                }).catch((err) => { console.log(err); alert("something is wrong") });
        }

        this.closeTenantCard();
    }

    closeTenantCard() {
        this.setState({ addOrUpdatePopUp: false })
    }

    signOut() {
        axios.post('http://localhost:3000/user/signOut', { username: this.state.username })
            .then((res) => {
                this.setState({ token: "" });
                axios.defaults.headers.common['apptoken'] = "" // for all requests
                this.props.userLoggedOut();
            }).catch((err) => { console.log(err); alert("something is wrong") });
    }

    render() {
        return (
            <div className="TenantManagmentPageContainer">

                <div className="logoutContainer">
                    <span>Hello {this.state.username}!</span>
                    <button className="signOutBtn" onClick={this.signOut}>Sign Out</button>
                </div>

                <div className="searchContainer">
                    <span>Search tenant: </span>
                    <input id="searchText" type="text" value={this.state.searchTerm} onChange={(e) => this.setState({ searchTerm: e.target.value })} />

                    <button className="searchBtn" onClick={this.searchTenantByName}>Search</button>

                    <button onClick={() => {
                        this.checkWhatToShow();
                        this.setState({ searchTerm: "" });
                    }}>Clear Search</button>

                    <div className="filterAndBtn">
                        <select id="filter" onChange={this.changeTenantsToShow}>
                            <option value="All">Show All Tenants</option>
                            <option value="With Debts">Show Tenants With Debts</option>
                            <option value="No Debts">Show Tenants With No Debts</option>
                        </select>

                        <button className="addBtn" onClick={this.showNewTenantCard}>Add new Tenant</button>
                    </div>

                </div>

                <div className="infoContainer">
                    <TenantsTable deleteTenantById={this.deleteTenantById} tenants={this.state.tenantsToShow} showExistingTenantCard={this.showExistingTenantCard} />
                    {this.state.addOrUpdatePopUp ?
                        (this.state.newCard ?
                            <TenantCard isNewTenant={true} updateDB={this.updateDB} closeTenantCard={this.closeTenantCard} />
                            : <TenantCard isNewTenant={false} updateDB={this.updateDB} closeTenantCard={this.closeTenantCard} tenantDetails={this.state.tenantToShowOnCard} />)
                        : null}
                </div>
            </div >
        )
    }
}