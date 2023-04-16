import Telefon from "../../../Settings/assets/images/Phone_svg.svg"
import AppStore from "../../../Settings/assets/images/App.Store.Orginal.png"
import PlayMarket from "../../../Settings/assets/images/PlayMarket.png"
export const Onas_App = () => {
    return(
        <div className="onas_app">
            <div className="container_fluid">
                <div className="onas_app_align">
                    <div className="onas_app_image">
                        <img src={Telefon} alt="" />
                    </div>
                    <div className="onas_app_texts">
                        <h3>Скачай приложение и получай призы каждый деньСкачай приложение и получай призы каждый день</h3>
                        <p>Скачав наш приложение вы получаете возможность играть в призовые игры каждый день и выигровать разного рода подарки для себя.
                        В нашем приложении призовые игры проходят аблолютно каждый день и всё это совершенно бесплатно.</p>                        
                        <div className="onas_app_texts_align">
                            <a href="https://appstore.com">
                                <img src={AppStore} alt="" />
                            </a>
                            <a href="https://play.market.com">
                                <img src={PlayMarket} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}