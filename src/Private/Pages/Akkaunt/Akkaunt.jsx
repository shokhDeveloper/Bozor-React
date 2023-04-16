import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import { Akkaunt_page, Product } from "./Pages"
import { Btn } from "../../../Settings/Styleds"
import { useContext } from "react"
import { Context } from "../../../Settings"
import { LogoutOutlined } from "@mui/icons-material"

export const Akkaunt = () => {
    const {setToken, setUser} = useContext(Context)
    const navigate = useNavigate()
    const handleOut = () => {
        window.localStorage.removeItem("token_shop")
        window.localStorage.removeItem("user_shop")
        setToken(null)
        setUser(null)
        navigate("/")
    }
    return(
        <div className="akkaunt">
            <div className="container_fluid">
                <div className="akkaunt_route_align">
                <div className="akkaunt_routes">
                    <NavLink to={"my_accaunt"} className={({isActive}) => isActive ? "active_akkaunt_route": "akkaunt_page"}>Akkaunt</NavLink>
                    <NavLink className={({isActive}) => isActive ? "active_akkaunt_route": "akkaunt_page"} to={"Corsines"}>E'lonlaringiz</NavLink>
                </div>
                <Btn onClick={handleOut} variant="grey" style={{position: "relative", textAlign: "start"}}> Akkauntdan chiqib ketish <span style={{position:"absolute", top: "0.5rem"}}><LogoutOutlined/></span></Btn>
                </div>
                <div className="akkaunt_align">
                    <Routes>
                        <Route index element={<Akkaunt_page/>}/>
                        <Route path="/my_accaunt" element={<Akkaunt_page/>}/>
                        <Route path="/Corsines" element={<Product/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}