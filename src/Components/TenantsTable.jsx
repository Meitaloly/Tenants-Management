import React, { Component } from 'react'
import './../Styling/TenantsTable.css';
export default class TenantsTable extends Component {

    constructor(props) {
        super(props);
        this.openExistingTenantCard = this.openExistingTenantCard.bind(this);
        this.deleteTenant = this.deleteTenant.bind(this);
    }

    openExistingTenantCard(e) {
        this.props.showExistingTenantCard(e.target.className);
    }

    deleteTenant(e) {
        this.props.deleteTenantById(e.target.className);
    }

    render() {
        let { tenants } = this.props;
        return (
            <div className="TenantsTableContainer">
                <table className="TenantsTable">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Financial debts</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                    {tenants && tenants.map((tenant, index) =>
                        <tbody key={index} >
                            <tr className={tenant._id}>
                                <td> {tenant.name} </td>
                                <td> {tenant.phone} </td>
                                <td> {tenant.address} </td>
                                <td> {tenant.financial_debt} </td>
                                <td><button id="btn"className={tenant._id} onClick={(e)=>{this.openExistingTenantCard(e)}}>edit</button></td>
                                <td><button id="btn" className={tenant._id} onClick={(e)=>{this.deleteTenant(e)}}>delete</button></td>

                            </tr>
                        </tbody>
                    )}
                </table>
            </div >
        )
    }
}