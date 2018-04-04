import React, {
  Component
} from "react";

import Button from 'material-ui/Button';

import Divider from 'material-ui/Divider';

import ReactDOM from "react-dom";

import base64ImageFile from "../Constant/base64-image-file";

import UserNullIcon from "../../assets/missingUserIcon.png";

export default class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valuePhoneUpdate: null,
      valuePasswordUpdate: null,
      valueRePasswordUpdate: null,
      profileIconData: UserNullIcon,
      img64: null,
      firstName: 'First',
      lastName: 'Last',
      firstNameChanged: 'First',
      lastNameChanged: 'Last',
      currentPhoneNumber: '123456789012',
    }
  }

  /**
   * Function for rendering Edit Profile
   */

  _EditProfileRender = () => {

    let { firstName, lastName, firstNameChanged, lastNameChanged, profileIconData, img64 } = this.state;

    let nameUpdateSubmitButton = (firstNameChanged.length > 0 && lastNameChanged.length > 0) && (firstName !== firstNameChanged || lastName !== lastNameChanged || profileIconData !== this.props.avatar) ? true : false;

    return (
      <div>
        <p className="changePhoneTitle">EDIT PROFILE</p>
        <Divider />
        <div className="MainEditProfileChange">
          <div className="MainEditProfileChangeFirst">
            <label className="FieldLable">
              First Name
              <input type="text" value={firstNameChanged} onChange={(event) => this.setState({ firstNameChanged: event.target.value })} />
            </label>
            <label className="FieldLable">
              Last Name
              <input type="text" value={lastNameChanged} onChange={(event) => this.setState({ lastNameChanged: event.target.value })} />
            </label>
            <div className="sendUpdateNameBtn">
              {
                nameUpdateSubmitButton ?
                  <Button className="name-chng" onClick={() => {
                    this.setState({
                      firstName: firstNameChanged,
                      lastName: lastNameChanged,
                      profileIconData: img64,
                    })
                    this.props.firstNameChangedFunc(firstNameChanged);
                    this.props.lastNameChangedFunc(lastNameChanged);
                    alert("Saved");
                  }} >SAVE</Button>
                  :
                  <Button className="name-chng-not">SAVE</Button>
              }
            </div>
          </div>
          <div className="MainEditProfileChangeSecond">
            <div className="photoEdit">
              <label className="photoLable">Photo</label>
              <div className="photoImgMain">
                <div className="photoImgTag">
                  <img className="profileIcon" src={this.props.avatar} alt="profilePhoto" />
                </div>
                <div className="photoActionopt">
                  <p className="photoActionoptEdit">Edit Photo</p>
                  <input type="file" onChange={(event) => this._base64img(event.target.files[0])} className="imageSelectinput" accept="image/*" ref="input" />
                  <p className="photoActionoptDelete" onClick={() => {
                    this.setState({ img64: UserNullIcon })
                    this.props.avatarFirstLast(UserNullIcon)
                  }}>Delete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Function for converting selected image in base64
   */

  _base64img = async (imageFile) => {

    if (imageFile.type === null || imageFile.type === "" || imageFile.type === undefined) {
      return alert('Please select an image file');
    }

    if (!imageFile.type.match(/^image\//)) {
      return alert('Please select an image file');
    }

    let imageBase = await base64ImageFile(imageFile);
    this.props.avatarFirstLast(imageBase);
    this.setState({ img64: imageBase })

    ReactDOM.findDOMNode(this.refs.input).value = "";
  }

  /**
   * Function for rendering Phone Number Change
   */

  _ChangePhoneRender = () => {

    let { valuePhoneUpdate, currentPhoneNumber } = this.state;

    let smsSubmitButton = valuePhoneUpdate != null && valuePhoneUpdate.length > 10 && valuePhoneUpdate !== currentPhoneNumber ? true : false;

    return (
      <div>
        <p className="changePhoneTitle">CHANGE PHONE</p>
        <Divider />
        <div className="MainPhoneChange">
          <div className="MainPhoneChangeFirst">
            <div>
              <label className="FieldLable">
                Phone
                <input type="text" onChange={(event) => this.setState({ valuePhoneUpdate: event.target.value })} />
              </label>
              <div className="sedsmsBtn">
                {
                  smsSubmitButton ?
                    <Button className="send-sms" onClick={() => this.setState({ currentPhoneNumber: valuePhoneUpdate, valuePhoneUpdate: null })} >SEND SMS</Button>
                    :
                    <Button className="send-sms-not">SEND SMS</Button>
                }
              </div>
            </div>
          </div>
          <div className="MainPhoneChangeSecond">
            <div>
              <label className="FieldLable">
                Current phone
                <div>
                  <p className="PhoneCurrent">
                    {
                      currentPhoneNumber
                    }
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Function for rendering Password Change
   */

  _ChangePassword = () => {

    let { valuePasswordUpdate, valueRePasswordUpdate } = this.state;

    let pswdUpdateSubmitButton = valuePasswordUpdate != null && valueRePasswordUpdate != null && valuePasswordUpdate.length > 0 && valueRePasswordUpdate.length > 0 && valuePasswordUpdate === valueRePasswordUpdate ? true : false;

    return (
      <div>
        <p className="changePswdTitle">CHANGE PASSWORD</p>
        <Divider />
        <div className="MainPasswordChange">
          <label className="FieldLable">
            Password
            <input type="password" onChange={(event) => this.setState({ valuePasswordUpdate: event.target.value })} />
          </label>
          <label className="FieldLable">
            Confirm Password
            <input type="password" onChange={(event) => this.setState({ valueRePasswordUpdate: event.target.value })} />
          </label>
          <div className="sedsmsBtn">
            {
              pswdUpdateSubmitButton ?
                <Button className="pswd-chng" onClick={() => {
                  this.setState({
                    valuePasswordUpdate: null,
                    valueRePasswordUpdate: null,
                  })
                  alert("New Password Set Successfully")
                }} >SAVE</Button>
                :
                <Button className="pswd-chng-not">SAVE</Button>
            }
          </div>
        </div>
      </div>
    );
  }
  
  render() {

    const EditProfileRender = this._EditProfileRender();
    const ChangePhoneRender = this._ChangePhoneRender();
    const ChangePassword = this._ChangePassword();

    return (
      <div className="MenuBoxContainer-Not" >
        <div className="AccountBox">
          {
            EditProfileRender
          }
        </div>
        <div className="AccountBox">
          {
            ChangePhoneRender
          }
        </div>
        <div className="AccountBox">
          {
            ChangePassword
          }
        </div>
      </div>
    );
  }
}