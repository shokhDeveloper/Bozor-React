import Menu from "../../Settings/assets/images/burger_menu.png"
import X from "../../Settings/assets/images/X.png"
import { NavLink, Route, Routes } from "react-router-dom";
import Logo from "../../Settings/assets/images/MILANDI.svg";
import { Btn } from "../../Settings/Styleds/StyledComponents";

import { useEffect, useState } from "react";
export const Header = () => {
  const [ulBlock, setUlBlock] = useState(!true)
  const [headerClass, setHeaderClass] = useState("header_public")
  const handleClick = event => {
    setUlBlock(!ulBlock)
  }
  useEffect(() => {
    let ul = document.querySelector(".public_ul")
    ul.style.transform = ulBlock !== true? "translateX(0%)": "translateX(100%)"   
  },[ulBlock])
  const handleScroll = () => {
    if(window.scrollY > 30){
      setHeaderClass("header_public_active")
    }else{
      setHeaderClass("header_public")
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  },[])
  return (
    <div className={headerClass}>
        <div className="container_fluid">
          <nav className="public_nav">
            <img src={Logo} alt="" className="logo" />
            <ul className="public_ul">
              <li>
                <NavLink
                  to={"home"}
                  className={({ isActive }) =>
                    isActive ? "home_active" : "home_page"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/Войти"}>
                  <Btn className="login_btn" variant="grey">
                    Войти
                  </Btn>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/Зарегистрироваться"}>
                  <Btn className="register_btn" variant="yellow">
                    Зарегистрироваться
                  </Btn>
                </NavLink>
              </li>
            </ul>
            <div className="burger" onClick={handleClick}>
                <img style={{filter: headerClass === "header_public_active"? "invert(1)": false }} src={ulBlock === true? Menu: X} alt="" />
            </div>
          </nav>
        </div>
    </div>
  );
};
