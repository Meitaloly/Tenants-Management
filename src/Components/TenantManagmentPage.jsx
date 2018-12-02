import React, { Component } from 'react'
import $ from "jquery";
import TenantsTable from './TenantsTable';
import TenantCard from './TenantCard';
import axios from 'axios';

export default class TenantManagmentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTenants: [],
            tenantsToShow: [],
            showAllTenants: true,
            addOrUpdatePopUp: false,
            newCard: true,
            token: ""
        }
        this.searchTenantByName = this.searchTenantByName.bind(this);
        this.ChangeTenantsToShow = this.ChangeTenantsToShow.bind(this);
        this.ShowTenantCard = this.ShowTenantCard.bind(this);
        this.getAllTenantsFromServer = this.getAllTenantsFromServer.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['apptoken'] = this.props.token;// for all requests
        this.setState({ token: this.props.token },this.getAllTenantsFromServer);
    }

    getAllTenantsFromServer() {
        const token = this.state.token;
        axios.get('http://localhost:3000/tenant',{
            headers:{
                'apptoken': this.props.token,
            }
        })
            .then((res) => {
                console.log("res", res);
            }).catch((err) => { console.log(err);alert("something is wrong") });
    }

    searchTenantByName() {
        const text = $("#searchText").val();
        // let newList=[];
        // for(let tenant in this.state.allTenants)
        // {
        //     if(tenant)
        // }
    }

    ChangeTenantsToShow(e) {
        let newList = [];
        switch (e.target.value) {
            case "All":
                {
                    newList = this.state.allTenants;
                    break;
                }
            case "With Debts":
                {
                    this.state.allTenants.map((tenant) => {
                        if (tenant.financial_debt > 0) {
                            newList.push(tenant);
                        }
                    });
                    this.setState({ showAllTenants: false })
                    break;
                }
            case "No Debts":
                {
                    this.state.allTenants.map((tenant) => {
                        if (tenant.financial_debt === 0) {
                            newList.push(tenant);
                        }
                    });
                    this.setState({ showAllTenants: false })
                    break;
                }
        }
        this.setState({ tenantsToShow: newList });
    }

    ShowTenantCard() {
        this.setState({ addOrUpdatePopUp: true, newCard: true });
    }

    render() {
        return (
            <div className="TenantManagmentPageContainer">
                <div className="searchContainer">

                    <span>Search tenant: </span>
                    <input id="searchText" type="text" />
                    <button onClick={this.searchTenantByName}>Search</button>

                    <select id="filter" onChange={this.ChangeTenantsToShow}>
                        <option value="All">Show All Tenants</option>
                        <option value="With Debts">Show Tenants With Debts</option>
                        <option value="No Debts">Show Tenants With No Debts</option>
                    </select>

                    <TenantsTable tenants={this.state.showAllTenants ? this.state.allTenants : this.state.tenantsToShow} />
                    {this.state.addOrUpdatePopUp ?
                        (this.state.newCard ?
                            <TenantCard isNewTenant={true} />
                            : <TenantCard isNewTenant={false} />)
                        : null}
                    <button onClick={this.ShowTenantCard}>Add new Tenant</button>
                </div>
            </div >
        )
    }
}