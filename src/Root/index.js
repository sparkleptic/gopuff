import React, {
  Component
} from "react";

import Divider from 'material-ui/Divider';
import {
  MenuList,
  MenuItem
} from 'material-ui/Menu';
import {
  ListItemIcon,
  ListItemText
} from 'material-ui/List';

import UserNullIcon from "../assets/missingUserIcon.png";
import Order from "../assets/order.svg";
import Addresses from "../assets/addresses.svg";
import Credit_cards from "../assets/credit_cards.svg";
import Logout from "../assets/logout.svg";

import LogOut from "./Logout";
import MyCreditCard from "./MycreditCard";
import MyOrder from "./MyOrder";
import MyAddress from "./MyAddress";
import MyAccount from "./MyAccount";

import './index.css';


export default class Root extends Component {

  /**
   * Constructor and variable define
   */

  constructor(props) {
    super(props);
    this.state = {
      accountView: true,
      orderView: false,
      addressView: false,
      creaditCardView: false,
      logoutView: false,
      nameFirst: 'First',
      nameLast: 'Last',
      profileIconDataChanged: UserNullIcon,
    }
  }

  /**
   * Function for rendering the MENU selected option
   */

  _showContent = (data) => {
    this.setState({
      accountView: false,
      orderView: false,
      addressView: false,
      creaditCardView: false,
      logoutView: false,
    });

    switch (data) {
      case "Account":
        this.setState({
          accountView: true,
        });
        break;
      case "Order":
        this.setState({
          orderView: true,
        });
        break;
      case "Address":
        this.setState({
          addressView: true,
        });
        break;
      case "Creaditcard":
        this.setState({
          creaditCardView: true,
        });
        break;
      case "Logout":
        this.setState({
          logoutView: true,
        });
        break;

      default:
        this.setState({
          accountView: true,
          orderView: false,
          addressView: false,
          creaditCardView: false,
          logoutView: false,
        });
        break;
    }
  }

  /**
   * Function for rendering My Account
   */

  _accountViewRender = () => {
    let { profileIconDataChanged } = this.state;
    return <MyAccount 
      avatarFirstLast={this._avatarFirstLast} 
      avatar={profileIconDataChanged} 
      firstNameChangedFunc={this._firstNameChangedFunc}
      lastNameChangedFunc={this._lastNameChangedFunc}
    />
  }

  /**
   * Fuction for User Icon
   */

  _avatarFirstLast = (data) => {
    this.setState({ profileIconDataChanged: data });
  }

  /**
   * Function for User First Name
   */

  _firstNameChangedFunc = (data) => {
    this.setState({ nameFirst: data });
  }

  /**
   * Function For User Last Name
   */

  _lastNameChangedFunc = (data) => {
    this.setState({ nameLast: data });
  }

  /**
   * Function for rendering My Orders
   */

  _orderViewRender = () => {
    return <MyOrder />
  }

  /**
   * Function for rendering My Addresses
   */

  _addressViewRender = () => {
    return <MyAddress />
  }

  /**
   * Function for rendering My Credit Cards
   */

  _creaditCardViewRender = () => {
    return <MyCreditCard />
  }

  /**
   * Function for rendering logout
   */

  _logoutViewRender = () => {
    return <LogOut />
  }

  /**
   * Main render of the class
   */

  render() {

    const { accountView, orderView, addressView, creaditCardView, logoutView, nameFirst, nameLast, profileIconDataChanged } = this.state;

    let accountViewRender = accountView && this._accountViewRender();
    let orderViewRender = orderView && this._orderViewRender();
    let addressViewRender = addressView && this._addressViewRender();
    let creaditCardViewRender = creaditCardView && this._creaditCardViewRender();
    let logoutViewRender = logoutView && this._logoutViewRender();

    return (
      <div className="Account">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <MenuList className="MenuBoxContainer">
                <MenuItem onClick={() => this._showContent("Account")} className="MenuBox">
                  <ListItemIcon className="ListIconUser">
                    <img src={profileIconDataChanged} alt="userIcon" className="UserIcon" />
                  </ListItemIcon>
                  <ListItemText className="ListItemTextUser" inset primary={`${nameFirst} ${nameLast}`} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => this._showContent("Order")} className="MenuBox">
                  <ListItemIcon className="ListIconUser">
                    <img src={Order} alt="orderListIcon" className="OrderIcon" />
                  </ListItemIcon>
                  <ListItemText className="ListItemTextUser" inset primary="My Orders" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => this._showContent("Address")} className="MenuBox">
                  <ListItemIcon className="ListIconUser">
                    <img src={Addresses} alt="AddIcon" className="AddIcon" />
                  </ListItemIcon>
                  <ListItemText className="ListItemTextUser" inset primary="My Addresses" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => this._showContent("Creaditcard")} className="MenuBox">
                  <ListItemIcon className="ListIconUser">
                    <img src={Credit_cards} alt="CreaditCard" className="CreaditCardIcon" />
                  </ListItemIcon>
                  <ListItemText className="ListItemTextUser" inset primary="My Credit Cards" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => this._showContent("Logout")} className="MenuBox">
                  <ListItemIcon className="ListIconUser">
                    <img src={Logout} alt="LogOut" className="LogoutIcon" />
                  </ListItemIcon>
                  <ListItemText className="ListItemTextUser" inset primary="Logout" />
                </MenuItem>
              </MenuList>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              {
                accountViewRender
              }
              {
                orderViewRender
              }
              {
                addressViewRender
              }
              {
                creaditCardViewRender
              }
              {
                logoutViewRender
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}