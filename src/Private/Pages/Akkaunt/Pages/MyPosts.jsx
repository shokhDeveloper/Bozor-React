import { useCallback, useContext, useEffect, useState } from "react";
import { Btn } from "../../../../Settings/Styleds";
import { Modal } from "../../../../Settings/Modal";
import { AddPosts } from "../../Posts";
import axios from "axios";
import { Context } from "../../../../Settings";
import { Post } from "../../Posts/Post";

export const MyPosts = () => {
  const [modal, setModal] = useState(!true);
  const {user} = useContext(Context)
  const [data, setData] = useState([])
  const getMyTovar = useCallback(async () => {
    const request = await axios.get(`http://localhost:1111/posts?user_id=${user.id}`)
    const response = await request.data
    setData(response)
  },[])
  useEffect(() => {
    getMyTovar()
  },[getMyTovar])
  return (
    <div className="my_posts">
      <h2>My Posts</h2>
      <Modal modal={modal} setModal={setModal} title={"Post qushish"}>
        <AddPosts getMyTovar={getMyTovar} modal={modal} setModal={setModal}/>      
      </Modal>

      <Btn
        onClick={() => setModal(!modal)}
        className="my_post_add_btn"
        variant="green"
      >
        Post joylash
      </Btn>
      <div className="my_posts_align" >
        {data?.map((item) => {
            return(
              <Post avtor={item.avtor} key={item.id} getMyTovar={getMyTovar} body={item.body} title={item.title} id={item.id} user_id={item.user_id} mypost={true}/>
            )
        })}
      </div>
    </div>
  );  
};
