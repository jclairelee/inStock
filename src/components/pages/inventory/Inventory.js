import InventoryList from "../../inventoryList/InventoryList";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  const getInventory = () => {
    axios
      .get("http://localhost:8080/inventories")
      .then((res) => {
        setInventory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <InventoryList inventory={inventory} />
    </>
  );
}
