import styled, { createGlobalStyle } from "styled-components"
export const GlobalStyled = createGlobalStyle`
*{
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       font-family: "Regular";
       scroll-behavior: smooth;
}
.container_fluid{
    max-width: 90%;
    margin: 0 auto;
    padding: 0 10px;
}
`
const btn_settings = {
    yellow:{
        background: "#FFC000",
        padding: "0.5rem 1rem",
        color: "#000",
        letterSpacing: "1px",
        fontSize: "1.2rem"
    },
    grey: {
        background: "rgba(0, 0, 0, 0.05)",
        color: "#000",
        padding: "0.5rem 1rem",
        fontSize: "1.2rem"
    },
    crimson:{
        background: "crimson",
        color: "#fff",
        padding: "0.5rem 1rem",
        fontSize: "1.2rem"    
    },
    green:{
        background: "green",
        padding: "0.5rem 1rem",
        fontSize: "1.2rem"    
    },
}
export const Btn = styled.button`
    background: ${({variant}) => btn_settings[variant].background};
    padding: ${({variant}) => btn_settings[variant].padding};
    font-size: ${(params) => params?.className? "15px": btn_settings[params?.variant].fontSize};
    letter-spacing: 1px;
    border: 1px solid transparent;
    font-weight: 600;
    color: ${({className, variant}) => className === "add_product_korzina" || className === "remove_product_korzina" ? "#fff": btn_settings[variant].color };
`
export const A = styled.a`
    background: ${({variant}) => btn_settings[variant].background};
    padding: ${({variant}) => btn_settings[variant].padding};
    font-size: ${({variant}) => btn_settings[variant].fontSize} ;
    letter-spacing: 1px;
    border: 1px solid transparent;
    font-weight: 600;
    text-decoration: none;
    color: #fff;
    transition: 0.3s ease all;
    &:active{
        background: #fff ;
        color: #000;
    }
`