import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context, getItem, setItem } from "../../Settings";
import { Language } from "../../Settings";
export const LanguageHeader = () => {
    const {til, setTil} = useContext(Context)
    const [languageClass, setLanguageClass]  = useState(false)
    const handleScroll = () => {
      if(window.scrollY  > 30){ 
        setLanguageClass(true)
      }else{
        setLanguageClass(false)  
      }
    }
    useEffect(() => {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    },[])
    return (
    <div className={"language_header"} style={{background: languageClass === true? "#fff": "#000"}}>
      <div className="container_fluid">
        <div className="language_header_btns">
          <button style={{color: languageClass === true? "#000": "#fff"}} className={til == "ru"? "language_btn_active": "language_btn"} onClick={() => {
            setItem("lang","ru")
            let getLang = getItem("lang")
            setTil(getLang)
          }}>Ru</button>
          <button style={{color: languageClass === true? "#000": "#fff"}} onClick={() =>{
            setItem("lang", "uz")
            let getLang = getItem("lang")
            setTil(getLang)
          }} className={til === "uz"? "language_btn_active": "language_btn"}>UZB</button>
        </div>
      </div>
    </div>
  );
};
