import { ReactEventHandler, ReactNode } from "react";
import { FC } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import gambarLogOut from "../img/icons8-log-out-50.png";
import gambarLogOut2 from "../img/icons8-logou-50.png";

import { useStateContext } from "../context/ModeContext";
import loveIcon from "../img/-love-circled-94.png";
import FilmIcon from "../img/-film-reel-94.png";
import darkIcon from "../img/icons8-dark-mode-48.png";

interface TypeLeft {
  searchInput?: (e: any) => void;
  homeButton: () => void;
  favoriteButton: ReactEventHandler;
  search?: (e: any) => void;
  children?: ReactNode;
  value: string;
  mode: ReactEventHandler;
}

const Left: FC<TypeLeft> = (props: TypeLeft) => {
  const { searchInput, homeButton, favoriteButton, children, search, value, mode } = props;
  const navigate = useNavigate();
  const username = Cookies.get("username");
  const { darkMode } = useStateContext();

  const logOut = (): void => {
    if (username) {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure to Logout ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: darkMode ? "rgb(0 0 0)" : "rgb(13 148 136)",
      }).then((result) => {
        if (result.value) {
          Cookies.remove("username");
          navigate("/");
        }
      });
    }
  };

  const logIn = (): void => {
    navigate("/");
  };

  return (
    <div className={`  flex sm:flex-row flex-col justify-center items-center h-screen w-screen`}>
      <div className={`${darkMode ? `bg-black` : "bg-teal-600"} left h-1/3 sm:h-full flex flex-col justify-center items-center border-r-2 border-slate-400  sm:w-[50%] lg:w-[35%] w-screen shadow-md`}>
        <span className=" font-bold text-3xl mt-5 sm:mt-0 drop-shadow-md">Movies App</span>

        <div className={`search h-9 w-9/12 lg:h-14 rounded-lg lg:w-72 bg-slate-100 flex justify-between items-center mt-5 ${searchInput === undefined ? `hidden` : `block`} `}>
          <div onClick={search} className="cursor-pointer icon-search flex flex-col w-1/4 h-full justify-center items-center">
            <img width="24" height="24" src="https://img.icons8.com/cotton/64/000000/search--v1.png" alt="search--v1" />
          </div>
          <input onChange={searchInput ? (e: any) => searchInput(e) : undefined} type="text" value={value} className={`bg-slate-50 h-[1.8rem] pl-5 w-full lg:h-[3.1rem] text-black rounded-lg  font-semibold border-b-slate-500 mr-1 `} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 w-11/12 my-5 px-3">
          <button className=" shadow-md  px-4 py-3 lg:py-8 bg-slate-200 flex justify-center items-center opacity-95" onClick={homeButton}>
            <img className="h-8 lg:h-10" src={!darkMode ? `https://img.icons8.com/3d-fluency/94/film-reel.png` : FilmIcon} alt="film-reel" />
            <span className="ml-2 text-2xl font-bold text-white drop-shadow-md "> Home</span>
          </button>
          <button className="shadow-md  px-4 py-3 lg:py-8 bg-slate-200 flex justify-center items-center opacity-95" onClick={favoriteButton}>
            <img className="h-8 lg:h-10" src={!darkMode ? `https://img.icons8.com/3d-fluency/94/love-circled.png` : loveIcon} alt="love-circled" />
            <span className="ml-2 text-2xl font-bold text-white drop-shadow-md"> Favorite</span>
          </button>
        </div>
        <div className="sm:flex gap-5 m-3  hidden">
          {username ? (
            <button className={`${!darkMode ? ` bg-teal-800` : `bg-black border-slate-200 border-2`} text-xs  hidden w-[8rem] md:flex gap-2 justify-center items-center font-bold `} onClick={logOut}>
              <img src={!darkMode ? gambarLogOut2 : gambarLogOut} className="h-[1.4rem]" alt="" />
              Logout
            </button>
          ) : (
            <button className={`${!darkMode ? ` bg-teal-800` : `bg-black border-slate-200 border-2`} text-xs  hidden w-[8rem] md:flex gap-2 justify-center items-center font-bold `} onClick={logIn}>
              <img src={!darkMode ? gambarLogOut2 : gambarLogOut} className="h-[1.4rem]" alt="" />
              Login
            </button>
          )}
          <button className={`${!darkMode ? ` bg-teal-800` : `bg-black border-slate-200 border-2`} text-xs  hidden w-[8rem] md:flex justify-center items-center font-bold `} onClick={mode}>
            <img src={!darkMode ? "https://img.icons8.com/fluency/48/light-on.png" : darkIcon} className="h-[1.4rem]" alt="" />
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        <hr />
      </div>

      {children}
    </div>
  );
};

export default Left;
