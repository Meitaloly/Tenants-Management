import React, { Component } from 'react'
import './../Styling/TenentCard.css';

export default class TenantCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTenant: this.props.isNewTenant,
      tenantDetails: this.props.tenantDetails,
      newTenantDetails: {
        name: "",
        address: "",
        phone: "",
        financial_debt: ""
      },
      IsDebtNumber: false
    }
    //check if all fields in the card are filled and the debts are a number. 
    this.checkCardAndUpdate = this.checkCardAndUpdate.bind(this);
  }

  componentDidMount() {
    if (!this.state.newTenant) {
      this.setState({ newTenantDetails: this.state.tenantDetails });
    }
  }

  checkCardAndUpdate() {
    const { newTenantDetails } = this.state;
    if (newTenantDetails.name !== "" && newTenantDetails.address !== "" && newTenantDetails.phone !== "" && newTenantDetails.financial_debt !== "") {
      if (isNaN(newTenantDetails.financial_debt)) {
        alert("financial debt has to be a number");
      }
      else {
        this.props.updateDB(this.state.newTenant, this.state.newTenantDetails)
      }
    }
    else {
      alert("you have to fill all fields!");
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
              <div>Name:</div>
              <input className="nameInput" type="text"
                value={newTenant ? this.state.newTenantDetails.name : tenantDetails.name}
                onChange={(e) => {
                  let copy = this.state.newTenantDetails;
                  copy.name = e.target.value;
                  this.setState({ newTenantDetails: copy });
                }} />
            </div>
            <div>
              <div>Phone Number: </div>
              <input className="phoneField" type="text"
                value={newTenant ? this.state.newTenantDetails.phone : tenantDetails.phone}
                onChange={(e) => {
                  let copy = this.state.newTenantDetails;
                  copy.phone = e.target.value;
                  this.setState({ newTenantDetails: copy });
                }} />
            </div>
            <div >
              <div>Address: </div>
              <input className="addressField" type="text"
                value={newTenant ? this.state.newTenantDetails.address : tenantDetails.address}
                onChange={(e) => {
                  let copy = this.state.newTenantDetails;
                  copy.address = e.target.value;
                  this.setState({ newTenantDetails: copy });
                }} />
            </div>
            <div >
              <div>Financial Debt: </div>
              <input className="addressField" type="text"
                value={newTenant ? this.state.newTenantDetails.financial_debt : tenantDetails.financial_debt}
                onChange={(e) => {
                  let copy = this.state.newTenantDetails;
                  copy.financial_debt = e.target.value;
                  this.setState({ newTenantDetails: copy });
                }} />
            </div>
          </div>
          <br />
            <button  className="cardBtns" onClick={this.checkCardAndUpdate}>{this.state.newTenant ? "Add Tenant" : "Update Tenant"}</button>
            <button  className="cardBtns" onClick={this.props.closeTenantCard}>Cancel</button>
        </div>
      </div>
    );
  }
}


