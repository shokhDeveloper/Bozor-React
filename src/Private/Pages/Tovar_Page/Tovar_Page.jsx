import {Tovar} from "../../../Tovar"
import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Zvezda from "../../../Settings/assets/images/uch_yarim.png";
import { Context } from "../../../Settings";
import { A, Btn } from "../../../Settings/Styleds";
export const Tovar_Page = () => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate()
  const getTovar = useCallback(async () => {
    const request = await axios.get(`http://localhost:1111/product/${id}`);
    const response = await request.data;
    return [response];
  }, [id]);
  const { isLoading, isError, isSuccess, data } = useQuery(
    `/product/${id}`,
    getTovar
  );
  const getTovars = useCallback( async () => {
    const request = await axios.get(`http://localhost:1111/product`)
    const response = await request.data
    return response
  },[id])
  const query = useQuery("/product", getTovars)
  useEffect(() => {
      if(window.scrollY > 0){
        window.scrollY = 0
      }else{
        console.log(false)
      }
  }, [id])
  const handleKey = event => {
    if(event.keyCode === 27){
        navigate(-1)
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", handleKey)
    return () => window.removeEventListener("keyup", handleKey)
  },[])
  return (
    <div className="tovar_page">
      <div className="container_fluid">
        {isLoading && <h1>Yuklanmoqda</h1>}
        {isSuccess &&
          data?.map((item) => {
            return (
              <div className="tovar_page_align">
                <div className="tovar_page_image">
                  <img src={item.image} alt="tovar_image" />
                </div>
                <div className="tovar_page_text">
                    <div>

                  <p><strong>{item.type === "erkak"? "Erkaklar kiyim turi": "Ayollar kiyim turi"}</strong></p>
                    </div>
                  <div style={{flexDirection: "column"}}>
                    
                    <h2 style={{fontFamily: 'Bold'}}>{item.name}</h2>
                    <p>
                      <strong>{item.disc}</strong>
                    </p>
                  </div>
                  <div>
                    <img src={Zvezda} alt="zvezda" />
                    <h2
                      style={{
                        color: "green",
                        borderBottom: "2px solid green",
                        paddingBottom: "0.3rem",
                      }}
                    >
                      {item.price} <span>$</span>
                    </h2>
                    <p><strong> <span> Razmer: </span>  {item.ulcham}</strong></p>
                  </div>
                  {user.id === item.user_id ? (
                    <div>
                      <h3>Bu sizning mahsulotingiz</h3>
                    </div>
                  ) : (
                    <div className="settings_sotuvchi">
                      <A href={`tel:${item.telnumber}`} variant="green">
                        Telefon qilish
                      </A>
                      <Link className="tovar_page_user" to={`/avtor/${item.user_id}`}>Avtor {item.avtor.split(" ")[0].toString().charAt(0) + "." + item.avtor.split(" ")[1].toString().charAt(0)} </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
              <h2 style={{textAlign: "center", fontFamily: "Bold", padding: "1.5rem 0rem"}}>Boshqa mahsulotlar</h2>
        {isError && <h1>Xatolik yuz berdi</h1>}
        <div className="tovar_page_tovars">
            {query?.isLoading ? (
              <h1>Yuklanmoqda</h1>
            ): false}          
        

        {isSuccess?
          <>
            {query?.data?.map((item) => (
                <Tovar item={item} disc={item.disc} getProduct={getTovars} id={item.id} image={item.image} name={item.name} price={item.price} telnumber={item.telnumber} type={item.type} ulcham={item.ulcham} user_id={item.user_id} key={item.id}/>
            ))}
          </>
        :false}
      </div>
      </div>
    </div>
  );
};
