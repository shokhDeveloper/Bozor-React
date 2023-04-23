import { Link, NavLink } from "react-router-dom"
import Logo from "../../Settings/assets/images/MILANDI.svg"
import {LanguageHeader} from "../../Public/LanguageHeader"
import { Btn } from "../../Settings/Styleds/StyledComponents"
import { ShoppingCartOutlined } from "@mui/icons-material"
import { useCart } from "react-use-cart"
import { useContext, useEffect, useRef, useState } from "react"
import { Modal } from "../../Settings/Modal"
import Burger from "../../Settings/assets/images/burger_menu.png";
import BurgerX from "../../Settings/assets/images/X.png"
import { Context } from "../../Settings"
import { Korzina } from "../../Korzina"
export const Header = () => {
    const {user} = useContext(Context)
    const {totalItems, items, totalUniqueItems} = useCart()
    const [headerClass, setHeaderClass] = useState("header_public")
    const [korzinaOverlay, setKorzinaOverlay] = useState(!true)
    const [matches, setMatches] = useState(false)
    const [burger, setBurger] = useState(!true)
    const nav_ul = useRef()
    const handleScroll = () => {
        if(window.scrollY > 30){
            setHeaderClass("header_public_active")
        }else{
            setHeaderClass("header_public")
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])
    const handleClick = () => {
        setKorzinaOverlay(!korzinaOverlay)  
    }
    useEffect(() => {
        let korzina_modal = document.querySelector(".korzina_quti")
        if(korzinaOverlay=== true){
                setTimeout(() => {
                korzina_modal.classList.add("active_korzina_modal")
            }, 100)    
        }
    },[korzinaOverlay])
    const handleBurger = () => {
        setBurger(!burger)
    }
    useEffect(() => {
        nav_ul.current.style.transform = burger !== true ?"translateX(0px)": "translateX(100%)"
    },[burger])
    useEffect(() => {
        ;(function(x){
            if(x.matches){
                setMatches(true)
            }else{
                setMatches(false)
            }
        }(window.matchMedia("(max-width:1045px)")))
    },[window])
    useEffect(() => {
        window.localStorage.removeItem("react-use-cart")
    },[user])
    return(
    <>
    <header style={{zIndex: 5, position: "fixed" }} className={headerClass}>
        <LanguageHeader/>
        <div className="private_header" >
            <div className="container_fluid">
            <nav className="nav">
                <Link to={"/"} className="nav_logo">
                    <img src={Logo} alt="" />
                </Link>
                <ul ref={nav_ul} className="nav_ul" style={{background: headerClass==="header_public_active"? "black": "#fff"}}>
                    <li>
                        <NavLink onClick={() => {
                            if(matches === true){
                                setBurger(!burger)
                            }
                        }} style={{color:  headerClass === "header_public_active"? "#fff": "#000"}} className={({isActive}) => isActive? "active_page" : "page" } to={"/Главная"}>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => {
                            if(matches === true){
                                setBurger(!burger)
                            }
                        }} className={({isActive}) => isActive? "active_page": "page" } to={"/Онас"}>О нас</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => {
                            if(matches === true){
                                setBurger(!burger)
                            }
                        } } className={({isActive}) => isActive? "active_page": "page" } to={"/Категории"}>Категории</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => {
                            if(matches === true){
                                setBurger(!burger)
                            }
                        } } className={({isActive}) => isActive? "active_page": "page" } to={"/Akkaunt"}>Hастройка аккаунта</NavLink>
                    </li>
                </ul>
                <div className="korzina" onClick={handleClick}>
                    <p className="korzina_number"><small>{totalItems === 0? totalItems: totalItems}</small></p>
                    <ShoppingCartOutlined className="shopping_icon"/>
                </div>
                <Korzina korzinaOverlay={korzinaOverlay} setKorzinaOverlay={setKorzinaOverlay}/>
                <div className="burger_private_nav" onClick={handleBurger}>
                    <img style={{filter: headerClass === "header_public_active"? "invert(1)": false}} src={burger === true? Burger: BurgerX} alt="" />
                </div>
            </nav>
            </div>
        </div> 
    </header>  
    </>
    )
}