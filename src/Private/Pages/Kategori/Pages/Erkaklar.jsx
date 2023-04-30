import { useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../../../../Settings"
import axios from "axios"
import { useQuery } from "react-query"
import { Tovar } from "../../../../Tovar"

export const Erkaklar = () => {
    const api = `http://localhost:1111/product?type=erkak`  
    const [ulcham, setUlcham] = useState("")
    let [data, setData] = useState([])
    let [sort, setSort] = useState(null)
    const [name, setName] = useState("")
    const getProduct = useCallback(async () => {
        const request = await axios.get(api, {      
            params: {
                ulcham: ulcham ? ulcham : null,
                name: name ? name : null ,
                _sort: sort ? sort: null
            }
        }).catch((error) => console.log(error))
        const response = await request.data
        setData(response)
    },[ulcham, name, sort])
    const handleChange = event => { 
        switch(event.target.id){
            case "erkak_search":{
                if(event.keyCode === 13){
                    setName(event.target.value)
                }
            }break;
            case "erkak_filter":{
                setUlcham(event.target.value)
            }
        }
    }
    const handleSort = (event) => {
       setSort(event.target.value)
    }
    useEffect(() => {
        getProduct()
    },[getProduct])
    return(
        <div className="erkaklar_page">
                <h2>Erkaklar kiyimlari</h2>
                <div className="erkaklar_search">
                <input onKeyUp={handleChange} id="erkak_search" type="text" placeholder="Qidirish" className="erkaklar_seach_input" />
                <select onChange={handleChange} style={{background: "rgba(0, 0, 0, 0.05)"}} id="erkak_filter" defaultValue={"filter"} className="kategory_select">
                        <option selected disabled value="filter">Filter</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="3xl">3XL</option>
                    </select>
                    <select onChange={handleSort} id="erkak_sort" defaultValue={"default"}>
                        <option value="default" selected disabled>Sort</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
                <div className="erkaklar_align">
                        <>
                            {data?.length === 0 ? (
                                <div className="erkaklar_align_error_text">
                                    <h2>Bunday Tovar mavjud emas</h2>
                                </div>
                            ): false}
                        </>
                        <>
                            {data?.map((item) => (
                            <Tovar item={item} disc={item.disc} id={item.id} image={item.image} name={item.name} price={item.price} telnumber={item.telnumber} type={item.type} ulcham={item.ulcham} user_id={item.user_id} key={item.id}/>                     
                            ))}
                        </>
                </div>
            </div>
    )
}