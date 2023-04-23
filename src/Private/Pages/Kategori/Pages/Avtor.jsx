import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Tovar } from "../../../../Tovar"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
export const Avtor = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const getProduct = useCallback(async () => {
        const request = await axios({
            method: "GET",
            url: `http://localhost:1111/product?user_id=${id}`
        }).catch(error => {
            return error
        })
        const response = await request.data
        return response
    },[id])
    const {isLoading, isError, isSuccess, data} = useQuery(`/product?user_id=${id}`, getProduct)
    const getUser = useCallback(async () => {
        const request = await axios.get(`http://localhost:1111/users/${id}`)
        const response = await request.data
        setName({
            name: response?.name,
            lastname: response?.lastname
        })        
        return [...Array(response)]
    },[id])
    const user = useQuery(`/users/${id}`, getUser)
    const handleKey = event => {
        if(event.keyCode === 27){
            navigate(-1)
        }
    }
    useEffect(() => {
        window.addEventListener("keyup", handleKey)
        return () => window.removeEventListener("keyup", handleKey)
    },[])
    return(
        <div className="user_page">
            <div className="container_fluid">
                <div className="user_align" >
                <div className="user">
                    <div className="user_text">
                    {user?.isLoading && 
                        <h1>Yullanmoqda</h1>
                    }
                    {user?.isError &&
                        <h1 className="error_text">Serverda xatolik yuz berdi</h1> 
                    }
                    {user?.isSuccess && 
                        <React.Fragment>
                            {user?.data?.map((item) => {
                               return(
                                <>
                                <div className="user_name_text">
                                    <h1>{item.name} {item.lastname}</h1>
                                    <div>
                                        <p><strong>{item?.name.charAt(0) + item.lastname.charAt(0)}</strong></p>
                                    </div>
                                </div>
                                    <h2> Jins = {item.lastname[item.lastname.length-1] === "a" ? "Ayol": "Erkak"}</h2>
                                    <p><strong>Dasturga kirgan sanasi = {item?.date?.substring(0, 10)}</strong></p>
                                    <p><strong> Email = {item?.email}</strong></p>
                                    <a href="#tovarlar"><strong>Foydalanuvchi joylashtirgan boshqa e'lonlar <KeyboardDoubleArrowDownIcon style={{position:"relative", top: "0.3rem"}}/>   </strong></a>
                                </>
                                )
                            }    
                            )}
                        </React.Fragment>
                    }
                    </div>
                </div>
                <div className="user_tovars" id="tovarlar">
                    {isLoading && 
                        <h1>Yuklanmoqda</h1>
                    }
                    {isError && 
                        <h1 className="error_text">Xatolik yuz berdi</h1>
                    }
                    {isSuccess && 
                        <React.Fragment>
                            {data?.map((item) => {
                                return(
                                    <Tovar item={item} disc={item.disc} id={item.id} name={item.name} image={item.image} price={item.price} telnumber={item.telnumber} type={item.type} ulcham={item.ulcham} user_id={item.user_id} key={item.id}/>
                                )
                            })}
                        </React.Fragment>
                    }
                </div>
                </div>
            </div>
        </div>
    )
}