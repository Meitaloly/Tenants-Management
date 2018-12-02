import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.checkLoginData = this.checkLoginData.bind(this);
    }

    checkLoginData() {
        axios.post('http://localhost:3000/user/login',
            {
                userName: this.state.username,
                password: this.state.password
            }).then((res) => {
                if (res.data.token) {
                    this.props.userLoggedOn(true,res.data.token);
                }
                else{
                    console.log("error with token");
                }
            }).catch((err)=>{alert("username or password is incorrect")});
    }

    render() {
        return (
            <div className="LoginContainer">
                <span className="loginTitle">Login</span>
                <div>
                    <span>userName:</span>
                    <input className="userNameInput" type="text" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }}></input>
                </div>
                <div>
                    <span>password:</span>
                    <input className="passwordInput" type="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }}></input>
                </div>
                <button className="loginBtn" onClick={this.checkLoginData}>Login</button>
            </div>
        )
    }
}