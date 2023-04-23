import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import * as Yup from "yup";
import { Surov } from "./Surov";
import { Bittalab } from "./Bittalab";
import { All } from "../../../All";
import { One } from "./One";
export const Order_Card = () => {
    const date = new Date()
    const [order, setOrder] = useState(false)
    const [myDate, mySetDate] = useState(null)
    const {items} = useCart()
    let yil;
    const formik = useFormik({
        initialValues: {
            date: ""
        },
        onSubmit(event){
            yil = event.date.substring(0, 4)-0
            setOrder(true)
            mySetDate(yil)
        },
        validationSchema: Yup.object({
            date: Yup.string().required("Tugilgan sanani kiritish majburiy")
        })
    })
    const handleKey = event => {
        console.log(event.keyCode)
        if(event.keyCode === 16){
            setOrder(false)
            mySetDate(null)
        }
    }
    useEffect(() => {
        window.addEventListener("keyup", handleKey)
        return () => window.removeEventListener("keyup", handleKey)
    },[])
    console.log(items)
    return(
        <div className="order_card_form">
            <form onSubmit={formik.handleSubmit} style={{display: order === true ? "none": "block"}}>
                <label htmlFor="yosh">
                    <p style={{color: formik?.errors?.date ? "crimson": "black"}}><small>{formik?.errors?.date? formik?.errors?.date: "Tugilgan sanangizni yuboring"}</small></p>
                    <input {...formik.getFieldProps("date")} name="date" id="yosh" type="date" />
                </label>
                <button type="submit">Yuborish</button>
            </form>
            {myDate !== null &&
                <>
                {date.getFullYear() - myDate > 18 ? (
                  <Routes>
                    <Route index element={<Surov/>}/>
                    <Route path="/one-order/*" element={<Bittalab/>}/>
                    <Route path="/all-order" element={<All/>}/>
                    <Route path="/one-order/order/:id" element={<One/>}/>
                  </Routes>
                ):(
                    <h4 className="error_text">Sizning yoshingiz harid qilishga yetmaydi</h4>
                )
                    
                }
                </>
            }

        </div>
    )
}