import { FC } from "react";
import { MovieDetail } from "../Utils/typeInterface";
import { useStateContext } from "../context/ModeContext";

export const DetailCard: FC<MovieDetail> = (props: MovieDetail) => {
  const { title, poster_path, overview, vote_average, release_date, genres, popularity, production_companies } = props;
  const { darkMode } = useStateContext();
  return (
    <>
      {" "}
      <div
        className={`flex flex-col lg:flex-row justify-center lg:w-auto items-center gap-5 w-screen rounded-none lg:rounded-md overflow-hidden lg:pb-0 pb-8 md:h-auto h-[135vh] lg:pt-0 pt-[14rem] ${!darkMode ? `bg-teal-500` : `bg-black`}`}
      >
        <div className="lg:w-2/5 w-[95%] lg:relative bg-cover h-1/2 lg:h-full">
          <img src={poster_path} className="lg:rounded-none rounded-md md:w-auto md:h-auto h-[20rem]  w-full " />
        </div>
        <div className="h-full w-screen flex flex-col lg:w-3/5 gap-3 px-5 ">
          <span className="text-xl font-bold">{title}</span>
          <span className="text-sm mb-5 lg:w-auto md:pr-96 lg:pr-0">{overview}</span>
          <div className="flex gap-2 h-8 w-11/12 items-center">
            <span className={darkMode ? "bg-slate-500 text-white font-bold py-2 px-4" : vote_average > 8 ? `text-white font-bold py-2 px-4 bg-green-400` : `text-white font-bold py-2 px-4 bg-yellow-500`}>{vote_average}</span>
            <span className={`px-5 py-2 ${!darkMode ? `bg-black` : "bg-slate-600"} `}>{release_date}</span>
          </div>
          <span>
            {" "}
            <span className="font-semibold">Genre :</span> {genres}
          </span>
          <span>
            {" "}
            <span className="font-semibold">Popularity :</span> {popularity}
          </span>
          <span>
            {" "}
            <span className="font-semibold">Production :</span> {production_companies}
          </span>
        </div>
      </div>
    </>
  );
};
