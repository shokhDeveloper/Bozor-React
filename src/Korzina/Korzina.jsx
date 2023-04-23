import { useContext, useEffect, useState } from "react"
import { useCart } from "react-use-cart"
import { array } from "yup"
import { A, Btn } from "../Settings/Styleds"
import { NavLink } from "react-router-dom"
import { Context } from "../Settings"

export const Korzina = ({korzinaOverlay, setKorzinaOverlay}) => {
    const {items, updateItemQuantity, removeItem, emptyCart, cartTotal} = useCart()
    const {user} = useContext(Context)
    return(
        <div className="karzina_overlay" style={{display: korzinaOverlay === true? "flex": "none"}}>
                <div className="korzina_quti">
                    <div className="korzina_quti_header">
                        <button onClick={() => {
                            let korzina_modal = document.querySelector(".korzina_quti")
                            korzina_modal.classList.remove("active_korzina_modal")
                            setTimeout(() => {
                                setKorzinaOverlay(!korzinaOverlay)
                            },500) 
                        }}>&times;</button>
                    </div>
                    <div className="korzina_quti_cards">
                        <h3>Jami summa <span style={{padding: "0.3rem", background: "#FFC000", color: "#000"}}>{cartTotal} $</span></h3>
                        {items?.length && 
                            <>
                                {items.map((item) => (
                                    <div className="korzina_quti_card">
                                        <p><strong>{item.name}</strong></p>
                                        <div className="korzina_quti_card_btns">
                                            <Btn onClick={() =>  updateItemQuantity(item.id, item.quantity+1)} className="add_product_korzina" variant="green">Qushish + 1</Btn>
                                            {item?.quantity > 1 && 
                                                <p>{item.quantity}</p>
                                            }
                                            <Btn onClick={() => removeItem(item.id) } className="remove_product_korzina" variant="crimson">O'chirish</Btn>
                                        </div>
                                    </div>
                                ))}
                                <div className="korzina_end_btns">
                                    <Btn onClick={() => emptyCart() } className="remove_product_korzina" variant="crimson">Hammasini o'chirish</Btn>
                                <NavLink className={"hisob"} to={`/order/${user?.id}`}>Hisoblashish</NavLink>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
    )
}