import { useState } from "react";
import { Btn } from "../../../../Settings/Styleds";
import { Modal } from "../../../../Settings/Modal";
import { AddPosts } from "../../Posts";

export const MyPosts = () => {
  const [modal, setModal] = useState(!true);
  return (
    <div className="my_posts">
      <h2>My Posts</h2>
      <Modal modal={modal} setModal={setModal} title={"Post qushish"}>
        <AddPosts modal={modal} setModal={setModal}/>      
      </Modal>
    
      <Btn
        onClick={() => setModal(!modal)}
        className="my_post_add_btn"
        variant="green"
      >
        Post joylash
      </Btn>
    </div>
  );
};
