import { NavLink } from "react-router-dom"

export const Surov = () => {
    return(
        <div>     
            <div className="surov_text">
                <h4>Tulovni qay usulda bajarmoqchisiz</h4>
            </div>
            <div className="surov_cards_routes">
            <NavLink to={"one-order"}>Bittalab To'lov qilish</NavLink>
            <NavLink to={"all-order"}>Hammasiga birdan</NavLink>
            </div>
        </div>
    )
}