import { FC } from "react";
import { dataFilm } from "../Utils/typeInterface";
import { useStateContext } from "../context/ModeContext";
import loveIcon from "../img/-love-circled-94.png";

const Card: FC<dataFilm> = (props: dataFilm) => {
  const { name, gambar, deskripsi, rating, detail, addFavorit } = props;
  const { darkMode } = useStateContext();

  return (
    <div className="flex flex-col h-[20rem] sm:w-11/12 rounded-md overflow-hidden shadow-sm text-slate-100 bg-primary opacity-95 mt-5">
      <img src={gambar} alt="" className=" h-[50%]" />
      <div className={`title text-center h-[17%] ${!darkMode ? `bg-teal-500` : `bg-black`}  overflow-y-auto`}>
        <h3 className="font-semibold drop-shadow-md px-3">{name}</h3>
      </div>
      <p className="overflow-hidden text-sm mt-2 mb-2 text-center text-slate-400 h-[15%] px-2 ">{deskripsi}</p>
      <div className="bottom flex justify-center mb-3 items-center">
        <div className="rating flex justify-center items-center rounded-sm overflow-hidden ">
          <span className={`${darkMode ? `bg-black px-5 font-bold` : rating > 8 ? "bg-green-300 px-5 font-bold" : "bg-yellow-500 px-5 font-bold"}`}>{rating}</span>
          <span className="px-5 bg-slate-800 font-medium cursor-pointer" onClick={detail}>
            Detail
          </span>
        </div>
      </div>
      <div className="flex justify-center cursor-pointer items-center h-[8%]">
        <img className="h-4 lg:h-7 mb-2 border-2 border-slate-400 rounded-lg" src={!darkMode ? `https://img.icons8.com/3d-fluency/94/love-circled.png` : loveIcon} onClick={addFavorit} alt="love-circled" />
      </div>
    </div>
  );
};

export default Card;
