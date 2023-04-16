import { NavLink } from "react-router-dom"
import { Btn } from "../../Settings/Styleds/StyledComponents"
import Zvezda from "../../Settings/assets/images/uch_yarim.png"

export const Tovar = ({image}) => {
    return(
        <div className="public_tovar">
            <img src={image} alt="" />
            <div className="public_tovar_texts">
                <p><strong>Lorem ipsum dolor sit amet</strong></p>
                <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit sed odio sed nascetur.</span></p>
            </div>
            <div className="public_tovar_images">
                <img src={Zvezda} alt="" />
                <p><strong><small>855 у.е.</small></strong></p>
            </div>
            <NavLink to={"/Зарегистрироваться"}>
            <Btn style={{borderRadius: "8px"}} variant="yellow">Добавить в корзину</Btn>
            </NavLink>
        </div>
    )
}