import React from "react";
import axios from "axios";
import "./AddWarehouse.scss";
// import React, { useState } from "react";
import error from "../../assets/icons/error-24px.svg";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

function AddWarehouse() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const isWarehouseNameValid = form.warehousename.value;
    const isAdressValid = form.address.value;
    const isCityValid = form.city.value;
    const isCountryValid = form.country.value;
    const isContactNameValid = form.contactname.value;
    const isPositionValid = form.position.value;
    const isPhonenumberValid = form.phonenumber.value;
    const isEmailValid = form.email.value;

    if (!isWarehouseNameValid) {
      form.warehousename.style.border = "1px solid red";
      document.getElementById("warehousename-Valid").style.display = "block";
    } else {
      form.warehousename.style.border = "1px solid #bdc5d5";
      document.getElementById("warehousename-Valid").style.display = "none";
    }

    if (!isAdressValid) {
      form.address.style.border = "1px solid red";
      document.getElementById("address-Valid").style.display = "block";
    } else {
      form.address.style.border = "1px solid #bdc5d5";
      document.getElementById("address-Valid").style.display = "none";
    }

    if (!isCityValid) {
      form.city.style.border = "1px solid red";
      document.getElementById("city-Valid").style.display = "block";
    } else {
      form.city.style.border = "1px solid #bdc5d5";
      document.getElementById("city-Valid").style.display = "none";
    }

    if (!isCountryValid) {
      form.country.style.border = "1px solid red";
      document.getElementById("country-Valid").style.display = "block";
    } else {
      form.country.style.border = "1px solid #bdc5d5";
      document.getElementById("country-Valid").style.display = "none";
    }

    if (!isContactNameValid) {
      form.contactname.style.border = "1px solid red";
      document.getElementById("contactname-Valid").style.display = "block";
    } else {
      form.contactname.style.border = "1px solid #bdc5d5";
      document.getElementById("contactname-Valid").style.display = "none";
    }

    if (!isPositionValid) {
      form.position.style.border = "1px solid red";
      document.getElementById("position-Valid").style.display = "block";
    } else {
      form.position.style.border = "1px solid #bdc5d5";
      document.getElementById("position-Valid").style.display = "none";
    }

    if (!isPhonenumberValid) {
      form.phonenumber.style.border = "1px solid red";
      document.getElementById("phonenumber-Valid").style.display = "block";
    } else {
      form.phonenumber.style.border = "1px solid #bdc5d5";
      document.getElementById("phonenumber-Valid").style.display = "none";
    }

    if (!isEmailValid) {
      form.email.style.border = "1px solid red";
      document.getElementById("email-Valid").style.display = "block";
    } else {
      form.email.style.border = "1px solid #bdc5d5";
      document.getElementById("email-Valid").style.display = "none";
    }

    if (
      isWarehouseNameValid &&
      isAdressValid &&
      isCityValid &&
      isCountryValid &&
      isContactNameValid &&
      isPositionValid &&
      isPhonenumberValid &&
      isEmailValid
    ) {
      const newWarehouse = {
        warehouse_name: event.target.warehousename.value,
        address: event.target.address.value,
        city: event.target.city.value,
        country: event.target.country.value,
        contact_name: event.target.contactname.value,
        contact_position: event.target.position.value,
        contact_phone: event.target.phonenumber.value,
        contact_email: event.target.email.value,
      };

      axios
        .post(`http://localhost:8080/warehouses`, newWarehouse)
        .then((response) => console.log(response.data));
      window.location = "/";
      event.target.reset();
    }
  };

  return (
    <form className="addform" noValidate onSubmit={handleSubmit}>
      <div className="addform__title">
        <Link to="/">
          {" "}
          <img src={arrow} className="addform_arrow" alt="back"></img>
        </Link>
        <p>Add New Warehouse</p>
      </div>

      <div className="addform__content">
        <div className="addform__warehousedetails">
          <p className="addform__subtitle">Warehouse Details</p>
          <div className="addform__container">
            <div className="addform__detail">
              <label className="addform__label">Warehouse Name</label>
              <input
                className="addform__input"
                placeholder="Warehouse Name"
                name="warehousename"
                type="text"
                feedbackValid="saysomething"
                required
              ></input>
            </div>

            <div className="warehousename-Valid" id="warehousename-Valid">
              <img
                className="warehousename-Valid__img"
                src={error}
                alt="error"
              />
              <span className="warehousename-Valid__text">
                This field is required
              </span>
            </div>

            <div className="addform__detail">
              <label className="addform__label">Street Address</label>
              <input
                className="addform__input"
                placeholder="Street Address"
                name="address"
              ></input>

              <div className="address-Valid" id="address-Valid">
                <img className="address-Valid__img" src={error} alt="error" />
                <span className="address-Valid__text">
                  This field is required
                </span>
              </div>
            </div>
            <div className="addform__detail">
              <label className="addform__label">City</label>
              <input
                className="addform__input"
                placeholder="City"
                name="city"
              ></input>
              <div className="city-Valid" id="city-Valid">
                <img className="city-Valid__img" src={error} alt="error" />
                <span className="city-Valid__text">This field is required</span>
              </div>
            </div>
            <div className="addform__detail">
              <label className="addform__label">Country</label>
              <input
                className="addform__input"
                placeholder="Country"
                name="country"
              ></input>
              <div className="country-Valid" id="country-Valid">
                <img className="country-Valid__img" src={error} alt="error" />
                <span className="country-Valid__text">
                  This field is required
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="addform__hr"></hr>
        <div className="addform__contactdetails">
          <p className="addform__subtitle">Contact Details</p>
          <div className="addform__container">
            <div className="addform__detail">
              <label className="addform__label">Contact Name</label>
              <input
                className="addform__input"
                placeholder="Contact Name"
                name="contactname"
              ></input>
              <div className="contactname-Valid" id="contactname-Valid">
                <img
                  className="contactname-Valid__img"
                  src={error}
                  alt="error"
                />
                <span className="contactname-Valid__text">
                  This field is required
                </span>
              </div>
            </div>
            <div className="addform__detail">
              <label className="addform__label">Position</label>
              <input
                className="addform__input"
                placeholder="Position"
                name="position"
              ></input>
              <div className="position-Valid" id="position-Valid">
                <img className="position-Valid__img" src={error} alt="error" />
                <span className="position-Valid__text">
                  This field is required
                </span>
              </div>
            </div>
            <div className="addform__detail">
              <label className="addform__label">Phone Number</label>
              <input
                className="addform__input"
                placeholder="Phone Number"
                name="phonenumber"
              ></input>
              <div className="phonenumber-Valid" id="phonenumber-Valid">
                <img
                  className="phonenumber-Valid__img"
                  src={error}
                  alt="error"
                />
                <span className="phonenumber-Valid__text">
                  This field is required
                </span>
              </div>
            </div>
            <div className="addform__detail">
              <label className="addform__label">Email</label>
              <input
                className="addform__input"
                placeholder="Email"
                name="email"
              ></input>
              <div className="email-Valid" id="email-Valid">
                <img className="email-Valid__img" src={error} alt="error" />
                <span className="email-Valid__text">
                  This field is required
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="addform__btns">
        <Link to="/warehouse">
          {" "}
          <button className="addform__btncancel">Cancel</button>
        </Link>
        <button className="addform__btnsave" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default AddWarehouse;
