import { useCart } from "react-use-cart";
import Humo from "./Settings/assets/images/Без_названия-removebg-preview (1).png";
import UzCard from "./Settings/assets/images/Без_названия__1_-removebg-preview — копия.png";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "./Settings/Modal";
import { Btn } from "./Settings/Styleds";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import { useMutation } from "react-query";
import axios from "axios";
import { Context } from "./Settings";
import { useNavigate } from "react-router-dom";
export const All = () => {
  const date = new Date()
  const { items } = useCart();
  const {user} = useContext(Context)
  const [modal, setModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [btn, setBtn] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    card: Yup.string().required("Carta raqamini kiritish majburiy")
  }) 
  const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
    values: {
      card: ""
    },  
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  })
  const {isLoading, isError, isSuccess, data, mutate} = useMutation(data => {
    axios.post(`http://localhost:1111/order`, data).catch((error) => {
      if(error.name === "AxiosError"){
        setErrorModal(true)
        setTimeout(() => {
          setErrorModal(false)
          navigate("/")
        }, 2000)  
      } 
    }).then(response => {
      if(response.status === 201){
           setSuccess(true)
      }
    })
  }) 
  const onSubmit = event => {
    mutate({...event, user: `${user.name} ${user.lastname}`, tovars: items, date: `${date.toLocaleDateString}-${date.getHours()}:${date.getMinutes()} Harid qilindi` })
  } 
  watch()
  useEffect(() => {
    if(modal === false){
      setTimeout(() => {
        setModal(true)
        setTimeout(() => {
          setModal(false)
          setBtn(true)
        }, 5000)  
      }, 1000)  
    }
  },[])
  useEffect(() => {
    if(success === true){
      setSuccessModal(true)
      setTimeout(() => {
          setSuccessModal(false)
          navigate("/")
      }, 1000)
    }
  }, [success])
  return (
    <div>
      <img src={Humo} alt="" />
      <img src={UzCard} alt="" />
      {items?.map((item) => {
        return (
          <React.Fragment>
            <h3>
              {item.avtor} dan {item.name} ni harid qilish uchun
            </h3>
          </React.Fragment>
        );
      })}
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="card">
                <p className={errors?.card? "error_text": null}><small>{errors?.card? errors?.card?.message: "Carta raqamini kiriting"}</small></p>
              <input {...register("card")}  pattern="\d{13}" type="text"  id="card" placeholder="Carta raqamingizni kiriting" />
              </label>
              <Btn disabled={!isValid}  variant="yellow" type="submit" >Yuborish</Btn>
            </form>
            <Modal  modal={modal} setModal={setModal} title={"Eslatma"} disc="Eslatma uchun aytib o'tamiz siz karta raqamingizni kiritasiz va ulardan dasturni o'zi tovar narxidagi summani yechib o'z egalari kartasiga tushadi va siz tovarni qo'lingizga olasiz"/>
            <Modal modal={errorModal} setModal={setErrorModal} title={"Serverda hatolik yuz berdi"}/>
            {(function(){
              if(success && isSuccess){
                return(
                    <Modal modal={successModal} setModal={setSuccessModal} title={"Haridingiz uchun rahmat"} /> 
                )
              }
            }(success))}
            <Btn style={{display: btn === true && modal === false ? "block": "none"}}  onClick={() => setModal(true)} variant="crimson">Eslatmani yana ochish</Btn>
    </div>
  );
};
