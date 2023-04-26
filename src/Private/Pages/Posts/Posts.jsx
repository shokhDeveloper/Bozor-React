import { useEffect } from "react";
import { Post } from "./Post";
import { useNavigate } from "react-router-dom";

export const Posts = () => {
  const navigate = useNavigate()
  
  const handleKey = event => {
    if(event.keyCode === 27){
        navigate(-1)
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", handleKey)
    return () => window.removeEventListener("keyup", handleKey)
  },[])
    return (
    <div className="posts">
      <div className="container_fluid">
        <div className="posts_texts">
          <h2>Fikrlar</h2>
          <p>
            <strong>Dastur haqida boshqalarning fikri</strong>
          </p>
        </div>
      <div className="posts_align">
        <Post id={2}/>
      </div>
      </div>
    </div>
  );
};
