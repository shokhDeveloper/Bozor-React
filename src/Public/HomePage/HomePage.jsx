import Opa from "../../Settings/assets/images/Opa.png";
export const HomePage = () => {
  return (
    <div className="public_home_page">
      <div className="container_fluid">
        <div className="public_home_page_align">
          <div className="public_home_page_text">
            <h2>Быстрый и удобный шоппинг, не выходя из дома.</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis
              lectus odio vitae, duis nec ut velit, fermentum. Diam sollicitudin
              arcu euismod morbi. Adipiscing bibendum elementum, fermentum amet
              quis erat.
            </p>
          </div>
          <div className="public_home_page_image">
            <img src={Opa} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
