import Logo from "../../assets/logos/InStock-Logo_2x.png";
import React from "react";
import "./Header.scss";
import { NavLink,Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" alt="instock-logo" src={Logo} />
        </Link>

        <div className="header__navbar">
          <NavLink to="/warehouse" className="header__navlink">Warehouse</NavLink>
          <NavLink to="/inventory" className="header__navlink">Inventory</NavLink>
        </div>
      </div>
    </div>
  );
}
export default Header;
