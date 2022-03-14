import React, { Component } from "react";
import "../css/main.css";
import Nav from "../components/Nav/nav";
import UserCard from "../components/UserCard/userCard";
import ProfileOptions from "../components/ProfileOptions/profileOptions";
import SocialCard from "../components/SocialCard/socialCard";
import FriendComponent from "../components/FriendComponent/friendComponent";
import axios from "axios";

class Profile extends Component {
  state = {
    collapsed: false,
    optionsComponent: true,
    UserComponent: true,
    FavoriteComponent: false,
    socialComponent: false,
    friendComponent: false,
    friends: [],
    userInfo: {},
    users: {}
  };

  componentDidMount() {
    this.getFriends();
    this.socialize();
  }

  toggleBurger = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  };

  friendComponentRender = event => {
    this.setState({
      optionsComponent: false,
      friendComponent: true,
      socialComponent: false,
      FavoriteComponent: false,
      UserComponent:false
    });
  };

  closeFriendComponent = () => {
    this.setState({
      optionsComponent: true,
      UserComponent: true,
      friendComponent: false
    });
  };

  socialCardRender = event => {
    this.setState({
      optionsComponent: false,
      friendComponent: false,
      socialComponent: true,
      FavoriteComponent: false,
      UserComponent:false
    });
  };

  

  getProfileInfo = () => {
    const userArray = Object.keys(this.state.users);
    const currentUser = JSON.parse(window.localStorage.getItem("user"))
    userArray.map(item => {
      if (this.state.users[item].user_name === currentUser.userName){
        return this.setState({
          userInfo: this.state.users[item]
        })
      }
    });
  }

 

  render() {
    const burgerClass = this.state.collapsed ? "active-burger" : "";
    const showUl = this.state.collapsed ? "showUl" : "";
    
    return (
      <div className="profile-wrapper">
        <Nav
          toggleBurger={this.toggleBurger}
          burgerClass={burgerClass}
          showUl={showUl}
          storageClear={this.storageClear}
        >
          <a className="btn" href="/profile">
            Profile
          </a>
          <a className="btn" href="/" onClick={this.storageClear}>
            Sign Out
          </a>
        </Nav>
        <div className="profile-body">
          <div className="mobalOptionsMenu">
            <button
              className="btn optionButton submitBtn"
              onClick={event => this.friendComponentRender(event)}
            >
              Friends
            </button>
            <a href="/">
              <button className="btn btn-danger" onClick={this.storageClear}>
                Sign Out
              </button>
            </a>
          </div>
         </div>

          <div className="row justify-content-center g-5 profile-content">
              {this.state.UserComponent && (
                <div className="col-md-6 col-sm-11 eventComponent">
                  <h4 className="componentHeader">Profile</h4>
                  <div className="savedEventsWrapper"> 
                  </div>
                </div>
              )}
              {/* start here then move to the options component function above */}
              
            </div>
        </div>
    );
  }
}

export default Profile;
