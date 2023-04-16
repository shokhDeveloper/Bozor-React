import { O_Nas_text } from "./O_nas_text"
import { Onas_App } from "./Onas_App"
import { Onas_Cards } from "./Onas_Cards"
import { Onas_Iframe } from "./Onas_Iframe"
import {Glavni_Footer} from "../Glavni/Glavni_Footer"
export const O_nas = () => {
    return(
        <div className="o_nas">
            <div className="container_fluid">
                <O_Nas_text/>
                <Onas_Cards/>
            </div>
            <Onas_App/>
            <Onas_Iframe/>
            <Glavni_Footer/>
        </div>  
    )
}