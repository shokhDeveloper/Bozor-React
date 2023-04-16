import { useQuery } from "react-query"
import { Tovar } from "../../../../Tovar"
import { useCallback, useContext } from "react"
import { Context } from "../../../../Settings"
import axios from "axios"

export const Product = () => {
    const {user} = useContext(Context)
    const getProduct = useCallback( async () => {
        const request = await axios({
            method: "GET",
            url: `http://localhost:1111/product?user_id=${user.id}`
        }).catch((error) => {
            return error
        })
        const response = await request.data
        return response
    },[user.id])
    const {isLoading, isError, isSuccess, data} = useQuery(`/product?user_id=${user.id}`, getProduct)
    return(
        <>
            {/* <h1 style={{fontFamily: "Bold"}}>Sizning e'lonlaringiz</h1> */}
            <div className="my_product">
            <h2>Sizning mahsulotlaringiz</h2>
            <div className="my_products">
                {isLoading && 
                    <h1>Yuklanmoqda</h1>
                }
                {data?.length? true: <h1>Hali sizning E'lonlaringiz mavjud emas</h1>}
                {isSuccess && (
                    data?.map((item) => (
                        <Tovar getProduct={getProduct } telnumber={item.telnumber} type={item.type} ulcham={item.ulcham} key={item.id} image={item.image} name={item.name} price={item.price} disc={item.disc} id={item.id} user_id={item.user_id}/>
                    ))
                )}
                {isError && 
                    <h1>Xatolik yuz berdi</h1>
                }
            </div>
            </div>

        </>
    )
}