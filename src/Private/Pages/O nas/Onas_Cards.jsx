import Zvezda from "../../../Settings/assets/images/yulduz.png"
import Moshina from "../../../Settings/assets/images/mashina.png"
import Like from "../../../Settings/assets/images/smile.png"
export const Onas_Cards = () => {
    return(
        <div className="onas_cards_align">
        <h2>Наши преимущества</h2>
        <div className="onas_cards">
            <div className="onas_card">
              <img src={Zvezda} alt="" />          
              <p><strong>Лучший сервис</strong></p>
            </div>
            <div className="onas_card">
              <img src={Moshina} alt="" />          
              <p><strong>Экспресс доставка </strong></p>
            </div>
            <div className="onas_card">
              <img src={Like} alt="" />          
              <p><strong>Лучшее качество в стране</strong></p>
            </div>
        </div>
        </div>
    )
}