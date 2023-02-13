import React from "react";
import WarehouseDetails from "../../warehouseDetails/WarehouseDetails";
import WarehouseList from "../../warehouseList/WarehouseList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Warehouse() {
  const [WHList, setWhList] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/warehouses`);
        setWhList(data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchWarehouses();
  }, []);

  return (
    <>
      <WarehouseList WHList={WHList} />
    </>
  );
}

export default Warehouse;
