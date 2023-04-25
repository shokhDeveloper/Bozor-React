import { useContext } from "react"
import GlavniImage from "../../../Settings/assets/images/Glavni_img.svg"
import { Glavni_Footer } from "./Glavni_Footer"
import { Glavni_Text } from "./Glavni_text"
export const Glavni = () => {
    return(
        <div className="glavni_page">
            <Glavni_Text/>
            <div className="container_fluid">
                <div className="glavni_page_align">
                    <div className="glavni_page_image">
                        <img src={GlavniImage} alt="" />
                    </div>
                    <div className="glavni_page_text">
                        <h2>Создай свой лук на все случаи жизни в “Imperia”</h2>
                        <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam sollicitudin a cursus in. Vel sit donec semper magna dignissim. Amet, mi justo at metus vestibulum sollicitudin lacus. Nunc vel egestas fermentum pellentesque sed vitae vel.</span></p>
                    </div>
                </div>
            </div>
            <Glavni_Footer/>
        </div>
    )
}