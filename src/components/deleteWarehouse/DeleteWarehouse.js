import "./DeleteWarehouse.scss";
import React from "react";
import deleteIcon from "../../assets/icons/close-24px.svg";
import WarehouseList from "../warehouseList/WarehouseList";
import WarehouseDetails from "../warehouseDetails/WarehouseDetails";

export default function DeleteWarehouse() {
  // return (
  //   <section className="warehouseDelete" id="warehouseDelete">
  //     <div className="warehouseDelete__icon-wrapper">
  //       <img
  //         className="warehouseDelete__icon"
  //         src={deleteIcon}
  //         alt="delete-icon"
  //       />
  //     </div>

  //     <div className="warehouseDelete__title-wrapper">
  //       <h1 className="warehouseDelete__title">
  //         Delete {warehouse.warehouse_name} warehouse?
  //       </h1>
  //     </div>
  //     <div className="warehouseDelete__text-wrapper">
  //       <p className="warehouseDelete__text">
  //         Please confirm that you’d like to delete the Washington from the list
  //         of warehouses. You won’t be able to undo this action.
  //       </p>
  //     </div>
  //     <div className="warehouseDelete__btn-wrapper">
  //       <button className="warehouseDelete__btn warehouseDelete__btn warehouseDelete__btn--cancel">
  //         Cancel
  //       </button>
  //       <button className="warehouseDelete__btn warehouseDelete__btn--delete">
  //         Delete
  //       </button>
  //     </div>
  //   </section>
  // );
}
