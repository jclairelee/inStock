import "./EditInventory.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import error from "../../assets/icons/error-24px.svg";

import backIcon from "../../assets/icons/arrow_back-24px.svg";

export default function EditInventory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [whId, setWhID] = useState("");
  const [inventoryItem, setInventoryItem] = useState([]);
  const [warehouseName, setWarehouseName] = useState("");
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [qty, setQty] = useState("");
  const [convertedWhId, setConvertedWhId] = useState("");
  const [warehousesOptionsName, setWarehousesOptionsName] = useState([]);
  const [inventoryOptionsCategory, setInventoryOptionsCategory] = useState([]);

  const getInventoryItem = () => {
    axios
      .get(`http://localhost:8080/inventories/${id}`)
      .then((res) => {
        const invtItemArray = res.data["inventoriesData"];
        invtItemArray?.forEach((invtItem) => {
          setWhID(invtItem.warehouse_id);
          setInventoryItem(res.data);
          setItem(invtItem.item_name);
          setCategory(invtItem.category);
          setDescription(invtItem.description);
          setStatus(invtItem.status);
          setQty(invtItem.quantity);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInventoryItem();
  }, []);

  const getInventoryOptionsCategory = () => {
    axios
      .get(`http://localhost:8080/inventories`)
      .then((res) => {
        const resultCategory = res.data.map((x) => x?.category);
        let uniqueCategory = resultCategory.filter(
          (item, i, ar) => ar.indexOf(item) === i
        );
        setInventoryOptionsCategory(uniqueCategory);
        return uniqueCategory;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInventoryOptionsCategory();
  }, []);

  const getWarehousesOptionsName = () => {
    axios
      .get(`http://localhost:8080/warehouses`)
      .then((res) => {
        const resultOptions = res.data.map((x) => x?.warehouse_name);
        setWarehousesOptionsName(resultOptions);
        return resultOptions;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWarehousesOptionsName();
  }, []);

  const getWarehouseData = (name) => {
    axios
      .get(`http://localhost:8080/warehouses`)
      .then((res) => {
        const result = res.data
          .filter((info) => info.warehouse_name === name)
          .map((x) => x.id);
        return result;
      })
      .then((result) => {
        setConvertedWhId(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return convertedWhId;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getWarehouseData();

    const form = e.currentTarget;
    console.log(form);
    // form validation

    const isItemValid = form.itemName.value;
    const isDesValid = form.des.value;

    if (!isItemValid) {
      form.itemName.style.border = "1px solid red";
      document.getElementById("itemName-Valid").style.display = "block";
    } else {
      form.itemName.style.border = "1px solid #bdc5d5";
      document.getElementById("itemName-Valid").style.display = "none";
    }

    if (!isDesValid) {
      form.des.style.border = "1px solid red";
      document.getElementById("des-Valid").style.display = "block";
    } else {
      form.des.style.border = "1px solid #bdc5d5";
      document.getElementById("des-Valid").style.display = "none";
    }

    const editData = {
      id: id,
      warehouse_id: convertedWhId,
      item_name: item,
      description: description,
      category: category,
      status: status,
      quantity: qty,
    };

    const updateData = () => {
      axios
        .put(
          `https://port-0-instock-api-1jx7m2gldot877s.gksl2.cloudtype.app/inventories/${id}`,
          editData
        )
        .catch((error) => {
          console.log(error);
        });
    };
    if (isItemValid && isDesValid) {
      updateData();
      navigate("/inventory");
    }
  };

  const invItemArray = inventoryItem["inventoriesData"];

  const getwarehouseName = () => {
    axios
      .get(`http://localhost:8080/warehouses/${whId}`)
      .then((res) => {
        const warehouseItemArray = res.data["warehouseData"];
        warehouseItemArray?.map((warehouseItem) => {
          setWarehouseName(warehouseItem.warehouse_name);
          return warehouseItem.warehouse_name;
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return warehouseName;
  };
  getwarehouseName();

  return (
    <>
      <form
        className="editInventoryForm"
        noValidate
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        {invItemArray?.map((invItem) => (
          <div key={invItem.id}>
            <div className="editInventoryForm__title">
              <Link to={`/inventory`}>
                <div className="item-top__backIcon">
                  <img
                    src={backIcon}
                    alt="arrow-back-icon"
                    className="item-top__backIcon"
                  />
                </div>
              </Link>
              <p className="editInventoryForm__title-text">
                Edit Inventory Item
              </p>
            </div>

            <div className="editInventoryForm__content">
              <div className="editInventoryForm__itemdetails">
                <p className="editInventoryForm__subtitle">Item Details</p>
                <div className="editInventoryForm__container">
                  <div className="editInventoryForm__detail">
                    <label className="editInventoryForm__label">
                      Item Name
                    </label>

                    <input
                      className="editInventoryForm__input"
                      type="text"
                      name="itemName"
                      placeholder={invItem?.item_name}
                      onChange={(e) => {
                        setItem(e.target.value);
                      }}
                    />
                  </div>

                  <div className="itemName-Valid" id="itemName-Valid">
                    <img
                      className="itemName-Valid__img"
                      src={error}
                      alt="error"
                    />
                    <span className="itemName-Valid__text">
                      This field is required
                    </span>
                  </div>

                  <div className="editInventoryForm__detail">
                    <label className="editInventoryForm__label">
                      Description
                    </label>
                    <textarea
                      className="editInventoryForm__input editInventoryForm__input-description"
                      type="textarea"
                      placeholder={invItem?.description}
                      name="des"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>

                  <div className="des-Valid" id="des-Valid">
                    <img className="des-Valid__img" src={error} alt="error" />
                    <span className="des-Valid__text">
                      This field is required
                    </span>
                  </div>

                  <div className="editInventoryForm__detail">
                    <label className="editInventoryForm__label">Category</label>
                    <select
                      className="editInventoryForm__select"
                      defaultValue={invItem?.category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <option value={invItem?.category} selected>
                        {invItem?.category}
                      </option>
                      {inventoryOptionsCategory?.map((category) => (
                        <option value={category} key={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="editInventoryForm__itemavailability">
                <p className="editInventoryForm__subtitle">Item Availability</p>
                <div className="editInventoryForm__container">
                  <div className="editInventoryForm__detail">
                    <label className="editInventoryForm__label">Status</label>
                    {invItem.status === "In Stock" ? (
                      <>
                        <div className="editInventoryForm__input-radioContainer">
                          <div className="editInventoryForm__input-radioStock">
                            <input
                              className="editInventoryForm__input-radio"
                              type="radio"
                              name="radio"
                              value="In Stock"
                              defaultChecked
                              onChange={(e) => {
                                e.target.checked === true
                                  ? setStatus("In Stock")
                                  : setStatus("Out of Stock");
                              }}
                            />
                            <label className="editInventoryForm__label-radio">
                              In stock
                            </label>
                          </div>
                          <div className="editInventoryForm__input-radioStock">
                            <input
                              className="editInventoryForm__input-radio"
                              type="radio"
                              name="radio"
                              value="Out of Stock"
                              onChange={(e) => {
                                !e.target.checked || e.target.checked === true
                                  ? setStatus("Out of Stock")
                                  : setStatus("In Stock");
                              }}
                            />
                            <label className="editInventoryForm__label-radio">
                              Out of stock
                            </label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="editInventoryForm__input-radioContainer">
                          <div className="editInventoryForm__input-radioStock">
                            <input
                              className="editInventoryForm__input-radio"
                              type="radio"
                              name="radio"
                              value="In Stock"
                              onChange={(e) => {
                                e.target.checked === true
                                  ? setStatus("In Stock")
                                  : setStatus("Out of Stock");
                                setStatus(e.target.value);
                              }}
                            />
                            <label className="editInventoryForm__label-radio">
                              In stock
                            </label>
                          </div>
                          <div className="editInventoryForm__input-radioStock">
                            <input
                              className="editInventoryForm__input-radio"
                              type="radio"
                              name="radio"
                              defaultChecked
                              value="Out of Stock"
                              onChange={(e) => {
                                !e.target.checked || e.target.checked === true
                                  ? setStatus("Out of Stock")
                                  : setStatus("In Stock");
                              }}
                            />
                            <label className="editInventoryForm__label-radio">
                              Out of stock
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {status === "In Stock" ? (
                    <>
                      <div className="editInventoryForm__detail">
                        <label className="editInventoryForm__label">
                          Quantity
                        </label>
                        <input
                          className="editInventoryForm__input"
                          placeholder={invItem?.quantity}
                          name="qty"
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        />
                      </div>

                      <div className="qty-Valid" id="qty-Valid">
                        <img
                          className="qty-Valid__img"
                          src={error}
                          alt="error"
                        />
                        <span className="qty-Valid__text">
                          This field is required
                        </span>
                      </div>

                      <div className="editInventoryForm__detail">
                        <label className="editInventoryForm__label">
                          Warehouse
                        </label>

                        <select
                          className="editInventoryForm__select"
                          placeholder={invItem.warehouse_id}
                          defaultValue={warehouseName}
                          onChange={(e) => {
                            getWarehouseData(e.target.value);
                          }}
                        >
                          <option value={warehouseName} selected>
                            {warehouseName}
                          </option>
                          {warehousesOptionsName?.map((name) => (
                            <option value={name} key={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="editInventoryForm__detail">
                        <label className="editInventoryForm__label">
                          Warehouse
                        </label>

                        <select
                          className="editInventoryForm__select"
                          defaultValue={invItem?.warehouse_id}
                          onChange={(e) => {
                            !e.target.value
                              ? setConvertedWhId(invItem?.warehouse_id)
                              : getWarehouseData(e.target.value);
                          }}
                        >
                          <option value={warehouseName} selected>
                            {warehouseName}
                          </option>
                          {warehousesOptionsName?.map((name) => (
                            <option value={name} key={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="editInventoryForm__btns">
              <Link to="/inventory">
                <button className="editInventoryForm__btn editInventoryForm__btncancel">
                  Cancel
                </button>
              </Link>
              <button className="editInventoryForm__btn editInventoryForm__btnsave">
                Save
              </button>
            </div>
          </div>
        ))}
      </form>
    </>
  );
}
