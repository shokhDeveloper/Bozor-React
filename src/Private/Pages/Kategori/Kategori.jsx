import { useContext } from "react"
import { useCallback } from "react"
import { NavLink, Route, Routes } from "react-router-dom"
import { Context } from "../../../Settings"
import axios from "axios"
import { useQuery } from "react-query"
import { Ayollar, Erkaklar } from "./Pages"

export const Kategory = () => {
    const {user} = useContext(Context)
    const getCategory = useCallback( async () => {
        const request = await axios.get(`http://localhost:1111/category`)
        const response = await request.data
        return response
    },[user.id])
    const {isLoading, isError, isSuccess, data} = useQuery("/category", getCategory) 
    return(
        <div className="kategory">
            <div className="container_fluid">
                <h1 style={{fontFamily: "Bold"}}>Categorylar</h1>
                <div className="kategory_routes">
                    <div className="kategory_route">
                        {isLoading &&
                        <h1>Yuklanmoqda</h1>}
                        {isError && <h1>Ma'lumotlar kelmadi</h1>}
                        {isSuccess && 
                            <>
                                {data?.erkak === true && data?.ayol !== true ? (
                                    <>
                                        <NavLink className={({isActive}) => isActive? "kategory_route_active": false} to={"/erkaklay_kiyimlari"}>Erkaklar kiyimlari</NavLink>
                                    </>
                                ) :false}
                                {data?.ayol === true && data?.erkak !== true ? (
                                    <>
                                        <NavLink className={({isActive}) => isActive ?  "kategory_route_active": false} to={"ayollar_kiyimlari"}>Ayollar kiyimlari</NavLink>
                                    </>
                                ) : false}
                                {data?.erkak === true && data?.ayol === true ? (
                                    <>
                                        <NavLink className={({isActive}) => isActive ?  "kategory_route_active": "kategory_route_a"} to={"erkaklar_kiyimlari"}>Erkaklar kiyimlari</NavLink>
                                        <NavLink className={({isActive}) => isActive ?  "kategory_route_active": "kategory_route_a"} to={"ayollar_kiyimlari"}>Ayollar kiyimlari</NavLink>
                                    </>
                                ): false}
                            </>
                        }
                    </div>
                   
                </div>
                <div className="kategory_align">
                       <Routes>
                            <Route index element={<Erkaklar />}/>
                            <Route path="/erkaklar_kiyimlari" element={<Erkaklar />}/>
                            <Route path="/ayollar_kiyimlari" element={<Ayollar/>}/>
                       </Routes>
                </div>
            </div>
        </div>
    )
}