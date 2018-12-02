import React, { Component } from 'react'
import Login from './Login';
import TenantManagmentPage from './TenantManagmentPage';


export default class MainApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOn: false,
            token:"",
            username:""
        }
        this.userLoggedOn = this.userLoggedOn.bind(this);
        this.userLoggedOut = this.userLoggedOut.bind(this);
    }

    userLoggedOn(value,userToken,username) {
        this.setState({ loggedOn: value, token: userToken , username });
    }

    userLoggedOut(){
        this.setState({ loggedOn: false});
    }

    render() {
        return (
            <div className="MainAppContainer">
                {!this.state.loggedOn ?
                    <Login userLoggedOn={this.userLoggedOn} /> :
                    <TenantManagmentPage username ={this.state.username} token={this.state.token} userLoggedOut={this.userLoggedOut}/>}
            </div >
        )
    }
}