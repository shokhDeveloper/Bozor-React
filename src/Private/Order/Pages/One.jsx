import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import Zvezda from "../../../Settings/assets/images/uch_yarim.png"
import { A } from "../../../Settings/Styleds";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import { useMutation } from "react-query";
import axios from "axios";
import { Modal } from "../../../Settings/Modal";
import { Context, setItem } from "../../../Settings";
export const One = () => {
  const date = new Date()
  const {user} = useContext(Context)
  const { id } = useParams();
  const { items, removeItem } = useCart();
  const navigate = useNavigate()
  const [tovar, setTovar] = useState([items[id - 0]]);
  const [modal, setModal] = useState(!true)
  const validationSchema = Yup.object({
    card_number: Yup.string().max(13, "Max 13 carta raqami").required("Karta raqami majburiy")
  }) 
  const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
    values:{
        card_number: ""
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  })
  const mutation = useMutation(data => {
    axios.post(`http://localhost:1111/order`, data).then((response) => {
        if(response.status === 201){
            setModal(!modal)
            setTimeout(() => {
                setModal(!modal)
                let id = response.data.tovar[0].id
                removeItem(id)
                navigate("/")
            }, 500)
        }
    })
  })
  const onSubmit = event => {
    mutation.mutate({ ...event,  avtor: `${user.name} ${user.lastname}`, tovar, user_id: user.id, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Harid qilindi` })
  }
  watch()
  return <>
    <div className="tovar_orders" style={{display: "grid", gridTemplate: "repeat(1, auto) / repeat(2, 50%)", justifyContent: "space-between"}}>
        <div style={{background: "#fff"}} className="order_user">
                {tovar?.map((item) => (
                    <>
                        <h1>{item?.avtor}</h1>
                        <A variant="green" href={"tel:"+item?.telnumber}>Telefon qilish</A>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="card_number">
                                <p className={errors?.card_number? "error_text": false}><small>{errors?.card_number? errors?.card_number?.message: "Karta raqami"}</small></p>
                                <input type="text" id="card_number" {...register("card_number")} pattern="\d{13}" />
                            </label>
                            <button type="submit">Yuborish</button>
                        </form>
                    </>
                ))}
        </div>
        {tovar?.map((item) => (
            <React.Fragment>
            {/* <h3>{item.name} sotib olish page</h3> */}
            <div className="order_card">
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    <strong>{item.disc}</strong>
                  </p>
                </div>
                <div>
                  <img src={Zvezda} alt="" />
                  <p>
                    <strong>{item.price}$</strong>
                  </p>
                </div>
                <div>
                  <NavLink to={`/tovar/${item.id}`}>Batafsil</NavLink>
                  <NavLink to={`/avtor/${item.user_id}`}>Avtor</NavLink>
                </div>
                </div>
                
            </React.Fragment>
        ))}
    </div>   
    <Modal modal={modal} setModal={setModal} title={"Xaridingiz uchun rahmat"}/>
  </>;
};
