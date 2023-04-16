import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import {Tovar} from "../../../../Tovar"
export const Ayollar = () => {
    const api = `http://localhost:1111/product?type=ayol`
    const [ulcham, setUlcham] = useState("")
    const [name, setName] = useState("")
    const [sort, setSort]  = useState("")
    const [data, setData] = useState([])
    const getProduct = useCallback(async () => {
        const request = await axios.get(api, {
            params:{
                ulcham: ulcham ? ulcham : null,
                name: name ? name : null,
                _sort: sort ? sort : null
            }
        }).catch((error) => console.log(error))
        const response = await request.data
        setData(response)
    },[api, ulcham, sort, name])
    const handleChange = event => {
        switch(event.target.id){
            case "ayollar_search_input":{
                if(event.keyCode === 13){
                    setName(event.target.value)
                }
            }break;
            case "ayollar_filter":{
                setUlcham(event.target.value)
            }break;
            case "ayollar_sort":{
                setSort(event.target.value)
            }break;
            default :  return false
        }
    }
    useEffect(() => {
        getProduct()
    },[getProduct])
    return(
        <div className="ayollar_page">
            <h2>Ayollar kiyimlari</h2>            
            <div className="ayollar_search">
                <input id="ayollar_search_input" onKeyUp={handleChange} placeholder="Search" type="text" className="ayollar_search_input" />
                <select id="ayollar_filter" onChange={handleChange} className="ayollar_select_filter" defaultValue={"filter"}>
                <option selected disabled value="filter">Filter</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="3xl">3XL</option>
                </select>
                <select id="ayollar_sort" onChange={handleChange} className="ayollar_select_sort" defaultValue={"default"}>
                    <option value="default" selected disabled>Sort</option>
                    <option value="name">Name</option>
                    <option value="value">Price</option>
                </select>
            </div>
            <div className="ayollar_align">
                {data?.length === 0? (
                    <div className="ayollar_align_error_text">
                        <h2>Bunday tovar topilmadi yoki serverda xatolik bor</h2>
                    </div>
                ):false}
                {data?.map((item) => (
                    <Tovar name={item.name} disc={item.disc} id={item.id} image={item.image} item={item} price={item.price} telnumber={item.telnumber} type={item.type} ulcham={item.ulcham} user_id={item.user_id} key={item.id}/> 
                ))}
            </div>
        </div>
    )
}