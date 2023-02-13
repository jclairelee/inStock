import "./App.scss";
import React from "react";
// import components
import Warehouse from "./components/pages/warehouse/Warehouse";
import Inventory from "./components/pages/inventory/Inventory";
import DeleteInventory from "./components/delteInventory/DeleteInventory";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WarehouseDetails from "./components/warehouseDetails/WarehouseDetails";
import EditWarehouse from "./components/editwarehouse/EditWarehouse";
import AddWarehouse from "./components/addwarehouse/AddWarehouse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryDetails from "./components/inventoryDetails/InventoryDetails";
import DeleteWarehouse from "./components/deleteWarehouse/DeleteWarehouse";
import EditInventory from "./components/editInventory/EditInventory";
import AddInventory from "./components/addInventory/AddInventory";

function App() {
  return (
    <>
      <div className="App" id="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<Warehouse />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/warehouse/:id" element={<WarehouseDetails />} />
            <Route path="/warehouse/add" element={<AddWarehouse />} />
            <Route path="/warehouse/:id/edit" element={<EditWarehouse />} />

            {/* Inventory routes */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<InventoryDetails />} />
            <Route path="/inventory/:id/edit" element={<EditInventory />} />

            <Route path="/inventory/add" element={<AddInventory />} />
            <Route path="/inventory/:id/delete" element={<DeleteInventory />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
