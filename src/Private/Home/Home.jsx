import { useContext } from "react"
import { Header } from "../Header"
import { RoutesX } from "../RoutesX"
import { Context } from "../../Settings"
import { Home as AdminHome } from "../../Admin/Home"
export const Home = () => {
    const {user} = useContext(Context)
    return(
        <>
        {user.name === "admin" && user.email === "userAdmin@gmail.com" ? (
            // password : adminShop
            <>
                <AdminHome/>
            </>
        ):(
            <div >
            <Header/>
            <div className="routes" style={{paddingTop: "10rem"}}>
                <RoutesX/>
            </div>
            </div>
        )}
        
        </>
    )
}