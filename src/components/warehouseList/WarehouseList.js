import "./WarehouseList.scss";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import close from "../../assets/icons/close-24px.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function WarehouseList({ WHList }) {
  const [warehouseToDelete, setWarehouseToDelete] = useState("");
  const [warehouseIdToDelete, setWarehouseIdToDelete] = useState("");

  function showDeleteConfirm(name, id) {
    document.getElementById("warehouseDelete").style.display = "block";
    document.getElementById("background").style.display = "block";
    setWarehouseToDelete(name);
    setWarehouseIdToDelete(id);
  }

  // click cancel icon
  function hideDeleteComponent() {
    document.getElementById("warehouseDelete").style.display = "none";
    document.getElementById("background").style.display = "none";
  }

  // click delete icon
  function ConfirmDelete() {
    axios
      .delete(`http://localhost:8080/warehouses/${warehouseIdToDelete}`)
      .then((response) => console.log(response.data));
    window.location = "/warehouse";
  }

  return (
    <>
      <section className="warehouseList">
        <div className="warehouseList__header">
          <h1 className="warehouseList__header-containers warehouseList__header-heading">
            Warehouses
          </h1>
          <div className="warehouseList__header-containers">
            <input
              type="text"
              name="text"
              placeholder="Search..."
              className="warehouseList__header-input"
            />
            <Link to="/warehouse/add">
              <button className="warehouseList__header-button">
                + Add New Warehouse
              </button>
            </Link>
          </div>
        </div>
        <div className="warehouseList__subheader">
          <div className="warehouseList__subheading-wrapper">
            <h3 className="warehouseList__subheading">WAREHOUSE</h3>
            <img src={sortIcon} className="sortIcon" alt="sort-icon" />
          </div>
          <div className="warehouseList__subheading-wrapper">
            <h3 className="warehouseList__subheading">ADDRESS</h3>
            <img src={sortIcon} className="sortIcon" alt="sort-icon" />
          </div>
          <div className="warehouseList__subheading-wrapper">
            <h3 className="warehouseList__subheading">CONTACT NAME</h3>
            <img src={sortIcon} className="sortIcon" alt="sort-icon" />
          </div>
          <div className="warehouseList__subheading-wrapper">
            <h3 className="warehouseList__subheading">CONTACT INFORMATION</h3>
            <img src={sortIcon} className="sortIcon" alt="sort-icon" />
          </div>
          <h3 className="warehouseList__subheading warehouseList__subheading-actions">
            ACTIONS
          </h3>
        </div>
        {WHList?.map((warehouse) => (
          <div key={warehouse.id}>
            <div className="list__item-containerMobile">
              <div className="list__item-containers">
                <div className="list__item-containersFlex">
                  <div className="list__item">
                    <h3 className="list__item-heading">WAREHOUSE</h3>
                    <Link to={"/warehouse/" + warehouse.id}>
                      <div className="list__item-infoContainer">
                        <h3 className="list__item-info list__item-info--blue">
                          {warehouse.warehouse_name}
                        </h3>

                        <img
                          className="chevronRightIcon"
                          src={chevronRight}
                          alt="chevron right icon"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="list__item">
                    <h3 className="list__item-heading">ADDRESS</h3>
                    <p className="list__item-info">
                      {warehouse.address}, {warehouse.city}, {warehouse.country}
                    </p>
                  </div>
                </div>

                <div className="list__item-containersFlex">
                  <div className="list__item">
                    <h3 className="list__item-heading">CONTACT NAME</h3>
                    <p className="list__item-info">{warehouse.contact_name}</p>
                  </div>
                  <div className="list__item">
                    <h3 className="list__item-heading">CONTACT INFORMATION</h3>
                    <p className="list__item-info">{warehouse.contact_phone}</p>
                    <p className="list__item-info">{warehouse.contact_email}</p>
                  </div>
                </div>
              </div>

              <div className="list__item-containersIcons">
                <img
                  className="deleteIcon"
                  src={deleteIcon}
                  alt="delete icon"
                  onClick={() =>
                    showDeleteConfirm(warehouse.warehouse_name, warehouse.id)
                  }
                />

                <Link to={"/warehouse/" + warehouse.id + "/edit"}>
                  <img className="editIcon" src={editIcon} alt="edit icon" />
                </Link>
              </div>
            </div>

            <div className="list__item-container">
              <div className="list__item">
                <h3 className="list__item-heading">WAREHOUSE</h3>
                <Link to={"/warehouse/" + warehouse.id}>
                  <div className="list__item-infoContainer">
                    <h3 className="list__item-info list__item-info--blue">
                      {warehouse.warehouse_name}
                    </h3>

                    <img
                      className="chevronRightIcon"
                      src={chevronRight}
                      alt="chevron right icon"
                    />
                  </div>
                </Link>
              </div>
              <div className="list__item">
                <h3 className="list__item-heading">ADDRESS</h3>
                <p className="list__item-info">
                  {warehouse.address}, {warehouse.city}, {warehouse.country}
                </p>
              </div>

              <div className="list__item">
                <h3 className="list__item-heading">CONTACT NAME</h3>
                <p className="list__item-info">{warehouse.contact_name}</p>
              </div>
              <div className="list__item">
                <h3 className="list__item-heading">CONTACT INFORMATION</h3>
                <p className="list__item-info">{warehouse.contact_phone}</p>
                <p className="list__item-info">{warehouse.contact_email}</p>
              </div>

              <div className="list__item-containersIcons">
                {/* <Link to="/delete-warehouse"> */}
                <img
                  className="deleteIcon"
                  src={deleteIcon}
                  alt="delete icon"
                  onClick={() =>
                    showDeleteConfirm(warehouse.warehouse_name, warehouse.id)
                  }
                />
                {/* </Link> */}
                <Link to={"/warehouse/" + warehouse.id + "/edit"}>
                  <img className="editIcon" src={editIcon} alt="edit icon" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="background" className="background">
        <section className="warehouseDelete" id="warehouseDelete">
          <div className="warehouseDelete__icon-wrapper">
            <img
              className="warehouseDelete__icon"
              src={close}
              alt="close-icon"
              onClick={() => hideDeleteComponent()}
            />
          </div>

          <div className="warehouseDelete__title-wrapper">
            <h1 className="warehouseDelete__title">
              Delete {warehouseToDelete} warehouse?
            </h1>
          </div>
          <div className="warehouseDelete__text-wrapper">
            <p className="warehouseDelete__text">
              Please confirm that you’d like to delete the {warehouseToDelete}
              from the list of warehouses. You won’t be able to undo this
              action.
            </p>
          </div>
          <div className="warehouseDelete__btn-wrapper">
            <button
              className="warehouseDelete__btn warehouseDelete__btn warehouseDelete__btn--cancel"
              onClick={() => hideDeleteComponent()}
            >
              Cancel
            </button>
            <button
              className="warehouseDelete__btn warehouseDelete__btn--delete"
              onClick={() => ConfirmDelete()}
            >
              Delete
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
