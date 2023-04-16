import Phone_image from "../../Settings/assets/images/Phone_svg.svg";
export const Footer = () => {
    return(
        <div className="public_footer">
            <div className="container_fluid">
                <div className="public_footer_align">
                    <div className="public_footer_image">
                        <img src={Phone_image} alt="" />
                    </div>
                    <div className="public_foot_text">
                        <h3>Скачай приложение и получай призы каждый день</h3>
                        <p>Скачав наш приложение вы получаете возможность играть в призовые игры каждый zдень и выигровать разного рода подарки для себя.
                        В нашем приложении призовые игры проходят аблолютно каждый день и всё это совершенно бесплатно.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}