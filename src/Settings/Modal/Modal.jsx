export const Modal = ({children, modal, setModal, title}) => {
    return(
        <div style={{display: modal === true? "flex": "none"}} className="overlay">
            <div className="modal">
                <div className="modal_header">
                    <button onClick={() => setModal(!modal)}>&times;</button>
                </div>
                <h1 style={{fontFamily: "Bold", paddingBottom: "1rem"}}>{title}</h1>
            {children}
            </div>
        </div>
    )
}