import { NavLink } from "react-router-dom"
import { useCart } from "react-use-cart"

export const Bittalab = () => {
    const {items} = useCart()
    return(
        <div className="order_one_korzina">
            {items?.map((item, index) => {
                return(
                    <div className="order_one_card">
                        <NavLink to={`order/${index}`}>{item.name} ga to'lov qilish</NavLink>
                    </div>
                )
            })}
        </div>
    )
}