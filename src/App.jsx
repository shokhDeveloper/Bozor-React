import {Routes, Route} from "react-router-dom"
import { useContext } from "react";
import {Home, Order} from "./Private";
import {Home as NotHome, Login, Register} from "./Public";
import {Context} from "./Settings"
import { GlobalStyled } from "./Settings/Styleds/StyledComponents";
function App() {
  const {token, user} = useContext(Context)
  console.log(token)
  return (
    <div className="App">
        <Routes>
            {token !== null? (
              <>
                <Route path="/*" element={<Home/>}/>
                <Route path="/order/:user/*" element={<Order/>}/>
              </>
            ):(
              <>
                <Route path="/Зарегистрироваться" element={<Register/>}/>
                <Route path="/*" element={<NotHome/>}/>
                <Route path="/Войти" element={<Login/>}/>
              </>
            )}
        </Routes>
        <GlobalStyled/>
    </div>
  );
}
export default App;
