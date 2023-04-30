import { useCart } from "react-use-cart"
import Zvezda from "../../../Settings/assets/images/uch_yarim.png"
import { NavLink } from "react-router-dom"
import Slider from "react-slick"
import "../../../Settings/React-Slick/slick.css";
import "../../../Settings/React-Slick/slick-theme.css";
export const Cards = () => {
    const {items} =useCart()
    const settings = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    return(
    <>
        <Slider {...settings} >
            {items?.map((item) => (
              <div className="order_card" >
                <img style={{textAlign: "center"}} src={item.image} alt="" />
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
              ))}
            </Slider>
          {items.length >= 1 ? 
             <NavLink style={{display:"block", margin: "3rem"}} to={"order-card"}>Keyingi</NavLink> : false}
        </>
    )
}