import { Tovar } from "../Tovar/Tovar"
import Negr from "../../Settings/assets/images/NegrSvg.svg"
import Sariq from "../../Settings/assets/images/Sariq.svg"
import Negr_2 from "../../Settings/assets/images/Negir_2.svg"
import Modni from "../../Settings/assets/images/Modni.svg"
export const TovarCards = () => {
    return(
        <div className="public_tovar_cards">
            <div className="container_fluid">
                <div className="public_tovar_text">
                <h2>Лучшие товары</h2>
                </div>
                <div className="public_tovar_align">
                    <Tovar image={Negr}/>
                    <Tovar image={Sariq}/>
                    <Tovar image={Negr_2}/>
                    <Tovar image={Modni}/>
                </div>
            </div>
        </div>
    )
}