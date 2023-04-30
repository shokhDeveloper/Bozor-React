import { useCallback, useEffect, useState } from "react";
import { Post } from "./Post";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Posts = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const getPosts = useCallback(async () => {
    const request = await axios.get(`http://localhost:1111/posts`)
    const response = await request.data
    setData(response)
  },[])
  const handleKey = event => {
    if(event.keyCode === 27){
        navigate(-1)
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", handleKey)
    return () => window.removeEventListener("keyup", handleKey)
  },[])
  useEffect(() => {
    getPosts()
  },[getPosts])
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
        {data?.map((item) => {
          return(
            <Post key={item.id} title={item.title} body={item.body} id={item.id} user_id={item.user_id} mypost={false}/>
          )
        })}
      </div>
      </div>
    </div>
  );
};
