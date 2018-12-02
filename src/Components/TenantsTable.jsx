import React, { Component } from 'react'
import './../Styling/TenantsTable.css';
export default class TenantsTable extends Component {
    render() {
        let { tenants } = this.props;
        console.log(tenants);
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
                                <td><button>edit</button></td>
                                <td><button>delete</button></td>

                            </tr>
                        </tbody>
                    )}
                </table>
            </div >
        )
    }
}