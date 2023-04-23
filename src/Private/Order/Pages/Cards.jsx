import { useCart } from "react-use-cart"
import Zvezda from "../../../Settings/assets/images/uch_yarim.png"
import { NavLink } from "react-router-dom"
export const Cards = () => {
    const {items} =useCart()
    return(
    <>
        <div className="order_page_cards">
            {items?.map((item) => (
                <>
              <div className="order_card">
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    <strong>{item.disc}</strong>
                  </p>
                </div>
                <div>
                  <img src={Zvezda} alt="" />
                  <p>
                    <strong>{item.price}$</strong>
                  </p>
                </div>
                <div>
                  <NavLink to={`/tovar/${item.id}`}>Batafsil</NavLink>
                  <NavLink to={`/avtor/${item.user_id}`}>Avtor</NavLink>
                </div>
              </div>
                </>
            ))}
          </div>
          {items.length >= 1 ?
            <NavLink style={{display:"block"}} to={"order-card"}>Keyingi</NavLink> : false}
        </>
    )
}