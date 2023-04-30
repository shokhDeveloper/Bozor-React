import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../../Settings";
import { Btn } from "../../../Settings/Styleds";
import { Modal } from "../../../Settings/Modal";
import { UpdatePosts } from "./UpdatePosts";

export const Post = ({ title, body, id, user_id, mypost, avtor, getMyTovar }) => {
  const { user } = useContext(Context);
  const [updateModal, setUpdateModal] = useState(!true)
  const navigate = useNavigate()
  const handleDelete = async id => {
    const request = await fetch(`http://localhost:1111/posts/${id}`, {
      method: "DELETE"
    }).catch((error) => {
      return error
    })
    const response = await request.json()
    return response
  }
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>
        <strong>{body}</strong>
      </p>
      <div className="post_avtor">
        {((user, id) => {
          if (user.id === id) {
            return <p onClick={() => navigate("/Akkaunt/my-posts") }>Bu sizning postingiz</p>;
          } else {
            return <NavLink to={`/avtor/${id}`}>Avtor = Shohijahon.M</NavLink>;
          }
          
        })(user, user_id)}
        <>
          {mypost ? (
            <div style={{display: "flex", justifyContent: "space-around", marginTop: "0.8rem"}}>
              <Btn style={{color: "#fff"}} variant="green" onClick={() => {
                setUpdateModal(!updateModal)}} >Yangilash</Btn>
              <Btn variant="crimson" onClick={() => handleDelete(id)}>Delete</Btn>
            </div>
          ):false}
        </> 
        <Modal modal={updateModal} setModal={setUpdateModal} title={"Yangilash"} >
          <UpdatePosts getMyTovar={getMyTovar} modal={updateModal} setModal={setUpdateModal} user_id={user_id} title={title} body={body} id={id} avtor={avtor} />
        </Modal>
      </div>
    </div>
  );
};
