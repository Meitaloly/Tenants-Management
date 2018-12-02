import React, { Component } from 'react'
import Login from './Login';
import TenantManagmentPage from './TenantManagmentPage';


export default class MainApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOn: false,
            token:""
        }
        this.userLoggedOn = this.userLoggedOn.bind(this);
    }

    userLoggedOn(value,userToken) {
        this.setState({ loggedOn: value, token: userToken });
    }

    render() {
        return (
            <div className="MainAppContainer">
                {!this.state.loggedOn ?
                    <Login userLoggedOn={this.userLoggedOn} /> :
                    <TenantManagmentPage token={this.state.token}/>}
            </div >
        )
    }
}