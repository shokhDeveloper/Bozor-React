import { Route, Routes } from "react-router-dom";
import { Cards } from "../Cards";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { HomePage } from "../HomePage";
import { LanguageHeader } from "../LanguageHeader";
import { TovarCards } from "../TovarCards";
export const Home = () => {
  return (
    <>
      <header>
        <LanguageHeader />
        <Header />
      </header>
      <div className="public_home">
        <div className="public_home_align">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </div>
      <Cards/>      
      <TovarCards/>
      <Footer/>
    </>
  );
};
