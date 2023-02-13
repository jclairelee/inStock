import "./InventoryList.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import less from "../../assets/icons/chevron_right-24px.svg";
import close from "../../assets/icons/close-24px.svg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryList = (props) => {
  const items = props.inventory;
  const [warehouse, setWarehouse] = useState([]);
  const [inventoryToDelete, setInventoryToDelete] = useState("");
  const [inventoryIdToDelete, setInventoryIdToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getWarehouseDetail = () => {
      axios
        .get(`http://localhost8080/warehouses/`)
        .then((res) => {
          setWarehouse(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      return warehouse;
    };
    getWarehouseDetail();
  }, []);

  const found = (id) => {
    const result = warehouse
      .filter((item) => item.id === id)
      .map((x) => x.warehouse_name);
    return result;
  };

  // let the delete component pop up
  function showDeleteConfirm(name, id) {
    document.getElementById("delete").style.display = "block";
    document.getElementById("background").style.display = "block";
    setInventoryToDelete(name);
    setInventoryIdToDelete(id);
  }

  // click cancel icon
  function hideDeleteComponent() {
    document.getElementById("delete").style.display = "none";
    document.getElementById("background").style.display = "none";
  }

  // click delete icon
  function ConfirmDelete() {
    axios
      .delete(`http://localhost:8080/inventories/${inventoryIdToDelete}`)
      .then((response) => console.log(response.data));
    window.location = "/inventory";
  }

  return (
    <>
      <form className="invList">
        <section className="invList-top">
          <div className="invList-top-title">
            <h2 className="invList-top-title invList-top-title__text">
              Inventory
            </h2>
          </div>
          <div className="invList-top-form invList-top-search">
            <input
              type="text"
              placeholder="Search..."
              className="invList-top-search__bar"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/inventory/add">
            <button className="invList-top-btn--blue">+ Add New Item</button>
          </Link>
        </section>
        <div className="invList__item">
          <div className="invList__item-bar">
            <div className="invList__item-bar-wrap invItem">
              <span className="invList__item-bar-text title-inv">
                INVENTORY ITEM
              </span>
              <img
                className="invList__item-bar-icon invList__item-bar-icon__inventory"
                src={sortIcon}
                alt="sort-icon"
              />
            </div>
            <div className="invList__item-bar-wrap category">
              <span className="invList__item-bar-text title-cat">CATEGORY</span>
              <img
                className="invList__item-bar-icon invList__item-bar-icon__category"
                src={sortIcon}
                alt="sort-icon"
              />
            </div>
            <div className="invList__item-bar-wrap status">
              <span className="invList__item-bar-text title-sta">STATUS</span>
              <img
                className="invList__item-bar-icon invList__item-bar-icon__status"
                src={sortIcon}
                alt="sort"
              />
            </div>
            <div className="invList__item-bar-wrap quantity">
              <span className="invList__item-bar-text title-qty">QTY</span>
              <img
                className="invList__item-bar-icon invList__item-bar-icon__qty"
                src={sortIcon}
                alt="sort"
              />
            </div>
            <div className="invList__item-bar-wrap warehouse">
              <span className="invList__item-bar-text title-ware">
                WAREHOUSE
              </span>
              <img
                className="invList__item-bar-icon invList__item-bar-icon__warehouse"
                src={sortIcon}
                alt="sort"
              />
            </div>
            <div className="invList__item-bar-wrap actions">
              <span className="invList__item-bar-text">ACTIONS</span>
            </div>
          </div>

          {items &&
            items.map((item) => (
              <div
                className="invList__item-info-Tablet
            "
                key={item.id}
              >
                <div className="invList__item-info-nameWrap">
                  <Link to={`/inventory/${item.id}`}>
                    <span className="invList__item-info-name">
                      {item.item_name}
                    </span>
                    <img
                      className="invList__item-info-image"
                      src={less}
                      alt="arrowRight"
                    />
                  </Link>
                </div>

                <span className="invList__item-info-category">
                  {item.category}
                </span>

                {item.status === "In Stock" && (
                  <div className="invList__item-info-status">
                    <span className="invList__item-info-status--inStock">
                      In Stock
                    </span>
                  </div>
                )}

                {item.status === "Out of Stock" && (
                  <div className="invList__item-info-status">
                    <span className="invList__item-info-status--outOfStock">
                      Out of Stock
                    </span>
                  </div>
                )}

                <span className="invList__item-info-num">{item.quantity}</span>

                <span className="invList__item-info-warehouse">
                  {found(item.warehouse_id)}
                </span>

                <div className="invList__item-info-actions">
                  <img
                    className="invList__item-info-actions-imge"
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => showDeleteConfirm(item.item_name, item.id)}
                  />

                  <Link to={`/inventory/${item.id}/edit`}>
                    <img
                      className="invList__item-info-actions-imge"
                      src={editIcon}
                      alt="edit"
                    />
                  </Link>
                </div>
              </div>
            ))}

          {items &&
            items.map((item) => (
              <div className="invList__item-info">
                <div className="invList__item-info-wrap" key={item.id}>
                  <div className="invList__item-info-contanier">
                    <span className="invList__item-info-tag">
                      INVENTORY ITEM
                    </span>
                    <div className="invList__item-info-nameWrap">
                      <Link to={`/inventory/${item.id}`}>
                        <span className="invList__item-info-name">
                          {item.item_name}
                        </span>
                        <img
                          className="invList__item-info-image"
                          src={less}
                          alt="arrowRight"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="invList__item-info-contanier">
                    <span className="invList__item-info-tag">STATUS</span>
                    {item.status === "In Stock" && (
                      <div className="invList__item-info-status">
                        <span className="invList__item-info-status--inStock">
                          In Stock
                        </span>
                      </div>
                    )}
                    {item.status === "Out of Stock" && (
                      <div className="invList__item-info-status">
                        <span className="invList__item-info-status--outOfStock">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="invList__item-info-wrap">
                  <div className="invList__item-info-contanier">
                    <span className="invList__item-info-tag">CATEGORY</span>

                    <span className="invList__item-info-category">
                      {item.category}
                    </span>
                  </div>

                  <div className="invList__item-info-contanier">
                    <span className="invList__item-info-tag">QTY</span>
                    <span className="invList__item-info-num">
                      {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="invList__item-info-wrap">
                  <div className="invList__item-info-contanier"></div>
                  <div className="invList__item-info-contanier">
                    <span className="invList__item-info-tag">WAREHOUSE</span>
                    <span className="invList__item-info-num">
                      {found(item.warehouse_id)}
                    </span>
                  </div>
                </div>

                <div className="invList__item-info-actions">
                  <img
                    className="invList__item-info-actions-imge"
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => showDeleteConfirm(item.item_name, item.id)}
                  />
                  <Link to={`/inventory/${item.id}/edit`}>
                    <img
                      className="invList__item-info-actions-imge"
                      src={editIcon}
                      alt="edit"
                    />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </form>

      <section id="background" className="background">
        <section className="delete" id="delete">
          <div className="delete__icon-wrapper">
            <img
              className="delete__icon"
              src={close}
              alt="close-icon"
              onClick={() => hideDeleteComponent()}
            />
          </div>
          <div className="delete__title-wrapper">
            <h1 className="delete__title">Delete {inventoryToDelete} item?</h1>
          </div>
          <div className="delete__text-wrapper">
            <p className="delete__text">
              Please confirm that you’d like to delete {inventoryToDelete} from
              the inventory list. You won’t be able to undo this action.
            </p>
          </div>
          <div className="delete__btn-wrapper">
            <button
              className="delete__btn delete__btn delete__btn--cancel"
              onClick={() => hideDeleteComponent()}
            >
              Cancel
            </button>
            <button
              className="delete__btn delete__btn--delete"
              onClick={() => ConfirmDelete()}
            >
              Delete
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default InventoryList;
