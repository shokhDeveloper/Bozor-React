import { useContext, useEffect } from "react";
import { NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Settings";
import { useCart } from "react-use-cart";
import Zvezda from "../../Settings/assets/images/uch_yarim.png";
import { Btn } from "../../Settings/Styleds";
import { Cards, Order_Card } from "./Pages";

export const Order = () => {
  const { user } = useContext(Context);
  const { items, cartTotal } = useCart();
  const navigate = useNavigate()
  const handleKey = event => {
    if(event.keyCode === 27){
        navigate(-1)
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", handleKey)
    return () => window.removeEventListener("keyup", handleKey)
  },[])
  return (
    <div className="order_page">
      <div className="container_fluid">
        <div className="order_page_texts">
          <h1>
            Hurmatli {user.name} {user.lastname} Sizning haridingiz
          </h1>
          <h3>Jami summa {cartTotal} $ </h3>
          <Routes>
            <Route index element={<Cards/>}/>
            <Route path="/order-card/*" element={<Order_Card/>}/>
          </Routes>
        </div>       
      </div>
    </div>
  );
};
