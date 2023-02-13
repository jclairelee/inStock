import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AddInventory.scss";
import { Link, useNavigate } from "react-router-dom";

const AddInventory = () => {
  const [item_name, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [isItem_name, setIsItem_name] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [itemWarehouse, setItemWarehouse] = useState("");
  const [isItemWarehouse, setisItemWarehouse] = useState(false);
  const [isQuantity, setIsQuantity] = useState(false);
  const [inventoryOptionsCategory, setInventoryOptionsCategory] = useState([]);
  const [warehouse_id, setWarehouseID] = useState("");
  const [warehouseOptions, setwarehouseOptions] = useState([]);

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

  const getWarehouses = () => {
    axios
      .get(`http://localhost:8080/warehouses`)
      .then((res) => {
        const resultOptions = res.data.map((x) => x?.warehouse_name);
        setwarehouseOptions(resultOptions);
        return resultOptions;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWarehouses();
  }, []);

  // const warehouses = [
  //   "Manhattan",
  //   "Washington",
  //   "Jersey",
  //   "San Fran",
  //   "Santa Monica",
  //   "Seattle",
  //   "Miami",
  // ];

  const navigate = useNavigate();
  function statusHandler(e) {
    if (e.target.value === "In Stock") {
      setStatus(true);
    }
    if (e.target.value === "Out Of Stock") {
      setStatus(false);
    }
  }
  function getWarehouseId(name) {
    axios.get("http://localhost:8080/warehouses").then((res) => {
      const selectedWarehouse = res.data.find((w) => w.warehouse_name === name);
      setWarehouseID(selectedWarehouse.id);
    });
  }

  function postNewInventoryItem(e) {
    e.preventDefault();

    if (!item_name) {
      setIsItem_name(true);
    }
    if (!itemWarehouse) {
      setisItemWarehouse(true);
    }
    if (!description) {
      setIsDescription(true);
    }
    if (!category) {
      setIsCategory(true);
    }
    if (!quantity) {
      setIsQuantity(true);
    }

    if (item_name && itemWarehouse && description && category) {
      const newInventoryItemData = {
        warehouse_id: warehouse_id,
        item_name: item_name,
        description: description,
        category: category,
        status: status ? "In Stock" : "Out of Stock",
        quantity: quantity,
      };
      window.console.log(newInventoryItemData, "value");

      axios
        .post("http://localhost:8080/inventories", newInventoryItemData)
        .then(navigate("/inventory"))
        // setItemName("");
        // setDescription("");
        // setCategory("");
        // setStatus(true);
        // setQuantity(0);
        // setItemWarehouse("");

        .catch((error) => {
          console.log("error", error);
        });
    }
  }
  return (
    <form className="addInventoryForm" onSubmit={postNewInventoryItem}>
      <Link to="/inventory">
        <div className="addInventoryForm__title">
          <p className="addInventoryForm__title-text">Add New Inventory Item</p>
        </div>
      </Link>

      <div className="addInventoryForm__content">
        <div className="addInventoryForm__itemdetails">
          <p className="addInventoryForm__subtitle">Item Details</p>

          <div className="addInventoryForm__container">
            <div className="addInventoryForm__detail">
              <label className="addInventoryForm__label">Item Name</label>
              <input
                className="addInventoryForm__input"
                placeholder="Item Name"
                type="text"
                value={item_name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setIsItem_name(false);
                  } else {
                    setIsItem_name(true);
                  }
                  setItemName(value);
                }}
                // style={{isItem_name}&&{Style}}
                // onBlur={(e) => {
                //   const value = e.target.value;
                //   if (value) {
                //     setIsItem_name(false);
                //   } else {
                //     setIsItem_name(true);
                //   }
                // }}
              />
              {isItem_name && (
                <div className="addInventoryValidation">
                  This fieid is required
                </div>
              )}
            </div>

            <div className="addInventoryForm__detail">
              <label className="addInventoryForm__label">
                Item Description
              </label>
              <textarea
                className="addInventoryForm__input editInventoryForm__input-description"
                type="textarea"
                placeholder="Please enter a brief item description..."
                value={description}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setIsDescription(false);
                  } else {
                    setIsDescription(true);
                  }
                  setDescription(value);
                }}
                // onBlur={(e) => {
                //   const value = e.target.value;
                //   if (value) {
                //     setIsDescription(false);
                //   } else {
                //     setIsDescription(true);
                //   }
                // }}
              />
              {isDescription && (
                <div className="addInventoryValidation">
                  This fieid is required
                </div>
              )}
            </div>

            <div className="addInventoryForm__detail">
              <label className="addInventoryForm__label">Category</label>

              <select
                className="addInventoryForm__select"
                value={category}
                placeholder="Please Select"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setIsCategory(false);
                  } else {
                    setIsCategory(true);
                  }

                  setCategory(value);
                }}
                // onBlur={(e) => {
                //   const value = e.target.value;
                //   if (value) {
                //     setIsCategory(false);
                //   } else {
                //     setIsCategory(true);
                //   }
                // }}
              >
                <option className="default" value={`Please Select`}>
                  Please Select
                </option>
                {inventoryOptionsCategory?.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              {isCategory && (
                <div className="addInventoryValidation">
                  This fieid is required
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="addInventoryForm__itemavailability">
          <p className="addInventoryForm__subtitle">Item Availability</p>

          <div className="addInventoryForm__container">
            <div className="addInventoryForm__detail">
              <label className="addInventoryForm__label">Status</label>

              <div className="addInventoryForm__input-radioContainer">
                <div className="addInventoryForm__input-radioStock">
                  <input
                    className="addInventoryForm__input-radio"
                    type="radio"
                    name="radio"
                    value="In Stock"
                    id="inStock"
                    checked={status}
                    onChange={(e) => statusHandler(e)}
                  />
                  <label className="addInventoryForm__label-radio">
                    In Stock
                  </label>
                </div>{" "}
                <div className="addInventoryForm__input-radioStock">
                  <input
                    className="addInventoryForm__input-radio"
                    type="radio"
                    name="radio"
                    required
                    value="Out Of Stock"
                    id="outOfStock"
                    checked={!status}
                    onChange={(e) => statusHandler(e)}
                  />
                  <label className="addInventoryForm__label-radio">
                    Out Of Stock
                  </label>
                </div>
              </div>
            </div>

            <div className="addInventoryForm__detail">
              <label className="addInventoryForm__label">Quantity</label>
              <input
                className="addInventoryForm__input"
                placeholder="0"
                type="number"
                disabled={!status}
                value={quantity}
                // onChange={(e) => setQuantity(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setIsQuantity(false);
                  } else {
                    setIsQuantity(true);
                  }
                  setQuantity(value);
                }}
              />
              {/* {isQuantity && (
                <div className="addInventoryValidation">
                  This fieid is required
                </div>
              )} */}
            </div>

            <div className="addInventoryForm__detail">
              <label className="addInventoryForm__label">Warehouse</label>
              <select
                className="addInventoryForm__select"
                value={itemWarehouse}
                onChange={(e) => {
                  console.log(e.target.value, "itemWarehouse");
                  const value = e.target.value;
                  if (value) {
                    setisItemWarehouse(false);
                  } else {
                    setisItemWarehouse(true);
                  }
                  getWarehouseId(value);
                  setItemWarehouse(value);
                }}
              >
                <option className="default" value={`Please Select`}>
                  Please Select
                </option>
                {warehouseOptions?.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              {isItemWarehouse && (
                <div className="addInventoryValidation">
                  This fieid is required
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="addInventoryForm__btns">
        <Link to="/inventory">
          {" "}
          <button className="addInventoryForm__btn addInventoryForm__btncancel">
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="addInventoryForm__btn addInventoryForm__btnsave"
        >
          +Add Item
        </button>
      </div>
    </form>
  );
};

export default AddInventory;
