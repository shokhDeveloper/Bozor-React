import { NavLink } from "react-router-dom";
import M from "../../../Settings/assets/images/M_2.svg"
export const Glavni_Footer = () => {
  return (
    <footer className="glavni_footer">
      <div className="container_fluid">
        <ul>
          <li>
                <p><strong>про imperia</strong></p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam vitae, vel mollitia atque sapiente consequuntur asperiores voluptates officiis quas reprehenderit.</p>
                <img src={M} alt="" />
          </li>
          <li>
                <p><strong>контакты</strong></p>
                <p>+998 90 958 78 87</p>
                <p>support@fonon.uz</p>
                <p><strong>рабочее время</strong></p>
                <p>По будням 9:00 to 18:00</p>
                <p>В выходные 11:00 to 18:00</p>
          </li>
          <li>
                <p><strong>Меню</strong></p>
                <NavLink to={"/Главная"} className={({isActive}) => isActive ? "active_page_footer": false }><p>Главная</p></NavLink>
                <NavLink to={"/Категории"} className={({isActive}) => isActive ? "active_page_footer": false }><p>Категории</p></NavLink>
                <NavLink to={"/Akkaunt"} className={({isActive}) => isActive ? "active_page_footer": false }><p>Hастройка аккаунта</p></NavLink>
                <NavLink to={"/Онас"} className={({isActive}) => isActive ? "active_page_footer": false }><p>О нас</p></NavLink>
          </li>
          <li>
                <p><strong>категории</strong></p>
                <p>Женская одежда</p>
                <p>Мужская одежда</p>
                <p>Детская одежда</p>
                <p>Обувь</p>
                <p>Аксесуары</p>
          </li>
        </ul>
      </div>
    </footer>
  );
};
