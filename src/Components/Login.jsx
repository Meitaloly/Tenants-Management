import React, { Component } from 'react'
import axios from 'axios';
import '../Styling/login.css';
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        //post request to see if the data of the user is correct and if so it will create a token.
        this.checkLoginData = this.checkLoginData.bind(this);
    }

    checkLoginData() {
        axios.post('http://localhost:3000/user/login',
            {
                userName: this.state.username,
                password: this.state.password
            }).then((res) => {
                if (res.data.token) {
                    this.props.userLoggedOn(true,res.data.token, this.state.username);
                }
                else{
                    console.log("error with token");
                }
            }).catch((err)=>{alert("username or password is incorrect")});
    }

    render() {
        return (
            <div className="LoginContainer">
                <h1 className="loginTitle">Login</h1>
                <div>
                    <input className="userNameInput" placeholder="username" type="text" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }}></input>
                </div>
                <div>
                    <input className="passwordInput" placeholder="password" type="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }}></input>
                </div>
                <button className="loginBtn" onClick={this.checkLoginData}>Login</button>
            </div>
        )
    }
}