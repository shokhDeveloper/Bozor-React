import Yulduz from "../../Settings/assets/images/yulduz.png";
import Mashina from "../../Settings/assets/images/mashina.png";
import Smile from "../../Settings/assets/images/smile.png";
export const Cards = () => {
    return(
        <div className="public_home_cards">
            <div className="container_fluid">
                <div className="public_home_cards_text">
                <h2>Наши преимущества</h2>
                </div>
                <div className="public_home_align_cards">
                    <div className="public_home_align_card">
                        <div className="public_home_align_card_align">
                        <img src={Yulduz} alt="" />
                        <p><span>Лучший сервис</span></p>
                        </div>
                    </div>
                    <div className="public_home_align_card">
                        <div className="public_home_align_card_align">
                        <img src={Mashina} alt="" />
                        <p><span>Экспресс доставка </span></p>
                        </div>
                    </div>
                    <div className="public_home_align_card">
                        <div className="public_home_align_card_align">
                        <img src={Smile} alt="" />
                        <p><span> Лучшее качество в стране </span></p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}