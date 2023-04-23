import { useContext, useEffect, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Context, getItem } from "./Settings"
import Zvezda from "./Settings/assets/images/uch_yarim.png"
import { Btn } from "./Settings/Styleds"
import { Modal } from "./Settings/Modal"
import { useMutation } from "react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ShopOutlined from "@mui/icons-material/ShoppingCartOutlined"
import * as Yup from "yup"
import { useCart } from "react-use-cart"
export const Tovar = ({name, image, disc, price, user_id, id, ulcham, type, telnumber, getProduct, item}) => {
    console.log(item)
    const date = new Date()
    const cart = useCart()
    console.log(cart)
    const {user}= useContext(Context)
    const [modal, setModal] = useState(!true)
    const navigate = useNavigate()
    const mutation = useMutation(id => {
        axios.delete(`http://localhost:1111/product/${id}`).then((response) => {
            getProduct()
            return response.data
        })
    })  
    const mutationUpdate = useMutation(data => {
        axios({
            method: "PUT",
            url: `http://localhost:1111/product/${id}`,
            data:{...data, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Update-At it's Product`, user_id: user.id, avtor: `${user.name} ${user.lastname}` }
        }).then((response) => {
            if(response.status === 200){
                setModal(!modal)
                getProduct()
            }
        }).catch((error) => {
            return error
        })
    })
    const handleNavigate = (event) => {
        if(event.target.classList.contains("update_tovar")){
            return "Loading ... "
        }else if(event.target.closest(".delete")){
            const id = event.target.id-0
            mutation.mutate(id)
        }else if(event.target.matches(".add_korzina_tovar_card_btn")){
            // cart.addItem(item)
        }else{
            navigate(`/tovar/${id}`)
        }   
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Mahsulot nomi majburiy"),
        disc: Yup.string().min(5, "Min 5").max(30, "Max 30").required("Disc majburiy"),
        type: Yup.string().required("Kiyim turini kiritish majburiy"),
        image: Yup.string().required("Rasm majburiy"),
        price: Yup.string().required("Narx majburiy"),
        telnumber: Yup.string().required("Raqam kiritish majburiy"),
        ulcham: Yup.string().required("Ulcham majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit } = useForm({
        values: {
            name: name,
            disc:disc,
            type: type,
            image: image,
            price: price,
            ulcham: ulcham,
            telnumber: telnumber
        },
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    })
    const onSubmit = event => {
        mutationUpdate.mutate(event)
    }
    let local_tovar = getItem("react-use-cart")
    let {items} =  local_tovar ? JSON.parse(local_tovar): []
    console.log(items)
    watch()
    return(
        <>
        <div data-id={id} onClick={handleNavigate} className="tovar">
            <img src={image} alt="" className="tovar_image" />
            <div>
                <h3 style={{fontSize: "23px", fontFamily: "Bold"}}>{name}</h3>
                <p ><strong>{disc}</strong></p>
            </div>
            <div className="tovar_texts">
                <img style={{width: "40%"}} src={Zvezda} alt="" />
                <p ><strong>{price} $</strong></p>
            </div>
            {user_id === user.id ? (
                <p >Sizning tovaringiz </p>    
            ):(
            <div className="add_korzina_tovar_card">
                <Btn variant="green" onClick={() => cart.addItem(item, 1)} className="add_korzina_tovar_card_btn">Korzinaga qo'shish <ShopOutlined style={{fontSize: "1em"}}/> </Btn>
                <NavLink to={`/tovar/${id}`}>Batafsil</NavLink>
            </div>
            )}
            {user_id === user.id ? (
                <div className="tovar_btns">
                    <Btn className="update_tovar" variant="yellow" onClick={() => setModal(!modal)}>Yangilash</Btn>
                    <Btn id={id} className="delete" variant="crimson" style={{color: "#fff"}}>Delete</Btn>
                </div>
            ): false}
        </div>
        <Modal title={"Yangilash"} modal={modal} setModal={setModal} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">
                        <input type="text" placeholder="Ismingizni kiriting" {...register("name")} id="name" />
                        <p className="error_text"><small>{errors?.name?.message}</small></p>
                    </label>
                    <label htmlFor="kiyim_turi">
                        <select {...register("type")} id="kiyim_turi">
                            <option selected disabled value="default">Kiym turi</option>
                            <option value="erkak">Erkak</option>
                            <option value="ayol">Ayol</option>
                        </select>
                        <p className="error_text"><small>{errors?.type?.message}</small></p> 
                    </label>
                    <label htmlFor="ulcham">
                        <select {...register("ulcham")} id="ulcham">
                                <option selected disabled value="ulcham">O'lcham</option>
                                <option value="xl">XL</option>
                                <option value="xxl">XXL</option>
                                <option value="xs">XS</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="3xl">3xl</option>
                        </select>
                        <p className="error_text"><small>{errors?.ulcham?.message}</small></p>
                    </label>
                    <label htmlFor="image">
                        <input {...register("image")} type="url" placeholder="Rasm linki" id="image" />
                        <p className="error_text"><small>{errors?.image?.message}</small></p>
                    </label>
                    <label htmlFor="price">
                        <input {...register("price")} type="number" id="price" placeholder="Narxi" />
                        <p className="error_text"><small>{errors?.price?.message}</small></p>
                    </label>
                    <label htmlFor="tel">
                        <input type="number" id="tel" {...register("telnumber")} placeholder="Telefon raqam"  />
                        <p className="error_text"><small>{errors?.telnumber?.message}</small></p>
                    </label>
                    <label htmlFor="disc">
                        <textarea id="disc" {...register("disc")} cols="30" rows="3" placeholder="Qisqacha ma'lumot"></textarea>
                        <p className="error_text"><small>{errors?.disc?.message}</small></p>
                    </label>
                    <label htmlFor="submit">
                        <Btn disabled={!isValid} id="submit" type="submit" variant="yellow">Yuborish</Btn>
                    </label>
                </form>
        </Modal>
        </>
    )
}