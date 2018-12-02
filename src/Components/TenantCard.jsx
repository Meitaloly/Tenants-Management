import React, { Component } from 'react'
import './../Styling/TenentCard.css';

export default class TenantCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTenant: this.props.isNewTenant,
      tenantDetails: {}
    }
  }

  componentDidMount() {
    if (!this.props.isNewTenant) {
      this.setState({ tenantDetails: this.props.tenantDetails });
    }
  }

  render() {
    const { newTenant, tenantDetails } = this.state;
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>Tenant Card</h1>
          <div className="cardDetails">
            <div>
              <span>Name:</span>
              {newTenant ?
                <input className="nameInput" type="text" /> :
                <span>{tenantDetails.name} </span>}
            </div>
            <div>
              <span>Phone Number: </span>
              {newTenant ?
                <input className="phoneField" type="text" /> :
                <span>{tenantDetails.phone} </span>}
            </div>
            <div >
              <span>Address: </span>
              {newTenant ?
                <input className="addressField" type="text" /> :
                <span>{tenantDetails.address} </span>}
            </div>
            <div >
              <span>Financial Debt: </span>
              {newTenant ?
                <input className="addressField" type="text" /> :
                <span>{tenantDetails.financial_debt} </span>}
            </div>
          </div>
          <button>{this.state.newTenant ? "Add Tenant" : "Update Tenant"}</button>
        </div>
      </div>
    );
  }
}