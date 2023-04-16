import Photo from "../../../Settings/assets/images/Photo.png"
export const O_Nas_text = () => {
  return (
    <>
        <div className="o_nas_title">
        <h2>О нас</h2>
        </div>
        <div className="onas_align">
            <div className="onas_text">
                <h4>«Потрясающий опыт, мне это нравится
                много. Спасибо команде.</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat leo, in sit tellus fermentum donec quisque diam molestie. Enim purus ullamcorper ultricies nisi. Eu sit laoreet egestas nascetur lacinia donec nunc viverra. Eu nullam cras eget egestas dui id platea magna. Massa lorem ultrices mauris tellus, mattis eu leo bibendum lobortis. </p>
            </div>
            <div className="onas_image">
                <img src={Photo} alt="" />
            </div>
        </div>
    </>
  );
};
