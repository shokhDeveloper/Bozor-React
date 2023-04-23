export const Modal = ({children, modal, setModal, title, disc}) => {
    return(
        <div style={{display: modal === true? "flex": "none"}} className="overlay">
            <div className="modal">
                <div className="modal_header">
                    <button onClick={() => setModal(!modal)}>&times;</button>
                </div>
                <h1 style={{fontFamily: "Bold", paddingBottom: "1rem"}}>{title}</h1>
                <p>{disc ? disc: null}</p>
            {children}
            </div>
        </div>
    )
}