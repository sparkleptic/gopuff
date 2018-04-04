import React, {
	Component
} from "react";

import Button from 'material-ui/Button';

import Divider from 'material-ui/Divider';

import {
	Close
} from 'material-ui-icons';

import BackLogo from "../../assets/ic_arrow-back.png";

export default class MyAddress extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			totalAddress: [],
			showAddBtn: true,
			valueAddress: null,
			valueApartment: null,
			valueZip: null,
		}
	}

	/**
	 * Function for performing action on the ADD NEW ADDRESS
	 */
	
	_submitAddress = () => {
		let tempstore = {};

		let { valueAddress, valueApartment, valueZip, totalAddress } = this.state;

		tempstore.valueAddress = valueAddress;
		tempstore.valueApartment = valueApartment;
		tempstore.valueZip = valueZip;

		let AddressValueState = totalAddress;
		AddressValueState.push(tempstore);

		this.setState({
			totalAddress: AddressValueState,
			valueAddress: null,
			valueApartment: null,
			valueZip: null,
			showAddBtn: true,
		})
	}

	/**
	 * Function for performing action on the removing particular address form the list of the address
	 */

	_removeAdd = (index) => {

		let { totalAddress } = this.state;

		let tempTotalAdd = totalAddress;

		tempTotalAdd.splice(index, 1);

		this.setState({ totalAddress: tempTotalAdd });
	}
	
	render() {

		const { valueAddress, valueApartment, valueZip, totalAddress, showAddBtn } = this.state;

		const ValueClick = valueAddress != null && valueApartment != null && valueZip != null && valueAddress.length > 0 && valueApartment.length > 0 && valueZip.length === 5 ? true : false;

		return(
			<div className="NewAddressView">
				{
					showAddBtn ?
						(
							<div className="NewAddBtn">
								<Button onClick={() => this.setState({ showAddBtn: false, })} className="New-Address">Add New Address</Button>
							</div>
						) : null
				}
				<div className="MenuBoxContainer">
					{
						showAddBtn ? (
							totalAddress.length <= 0 ?
								(
									<div className="AddTitle">
										<p className="EmptyView">YOU HAVE 0 ADDRESS</p>
									</div>
								)
								:
								(
									<div className="StoreAdd">
										<p className="AddressTitle" > YOU HAVE {totalAddress.length} ADDRESS </p>
										<Divider />
										<div className="StoreAddList">
											{
												totalAddress.map((data, index) => {
													return <div className="AddressContentMain" key={index}>
														<p className="AddressContent">
															{`${data.valueAddress}, ${data.valueApartment}, ${data.valueZip}`}
														</p>
														<Close onClick={() => this._removeAdd(index)} className="addRemove" />
													</div>
												})
											}
										</div>
									</div>
								)
						) : (
								<div className="AddNewAddMain">
									<div className="AddTitleBack">
										<img className="BackImgLogo" src={BackLogo} alt="BackLogo" onClick={() => this.setState({ showAddBtn: true, })} />
										<p className="AddTitle">ADD NEW ADDRESS</p>
									</div>
									<Divider />
									<form className="AddNewAddressForm">
										<div className="FormFieldFirst">
											<label className="FieldLable">
												Address
                        <input type="text" onChange={(event) => this.setState({ valueAddress: event.target.value })} />
											</label>
										</div>
										<div className="FormFieldSecond">
											<div className="ApartmentField">
												<label className="FieldLable">
													Apartment
                          <input type="text" onChange={(event) => this.setState({ valueApartment: event.target.value })} />
												</label>
											</div>
											<div className="ZipCode">
												<label className="FieldLable">
													Zip
                          <input type="text" placeholder="XXXXX" onChange={(event) => this.setState({ valueZip: event.target.value })} />
												</label>
											</div>
										</div>
										<div>
											{
												ValueClick ?
													<Button onClick={() => this._submitAddress()} className="Submit-Address"> Add Address </Button>
													:
													<Button className="Submit-Address-not"> Add Address </Button>
											}
										</div>
									</form>
								</div>
							)
					}
				</div>
			</div>
		);
	}
}