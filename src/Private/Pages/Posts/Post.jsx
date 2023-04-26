import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../../Settings";

export const Post = ({ id }) => {
  const { user } = useContext(Context);
  return (
    <div className="post">
      <h2>Yaxshi</h2>
      <p>
        <strong>Chidasa bo'ladi ammo ba'zi joylarida xatoliklar bor</strong>
      </p>
      <div className="post_avtor">
        {((user, id) => {
          if (user.id === id) {
            return <NavLink to={"/Akkaunt"}>Bu sizning tovaringiz</NavLink>;
          } else {
            return <NavLink to={`/avtor/${2}`}>Avtor = Shohijahon.M</NavLink>;
          }
        })(user, id)}
      </div>
    </div>
  );
};
