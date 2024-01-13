import { useState, useEffect, FC } from "react";
import CardFavorite from "../Components/CardFavorite";
import { useNavigate } from "react-router-dom";
import Left from "../Components/Left";
import { Movie } from "../Utils/typeInterface";
import { OutputDataFavorite } from "../Utils/typeInterface";
import BaseUrl from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useStateContext } from "../context/ModeContext";

const Favorite: FC = () => {
  const navigate = useNavigate();
  const poster = `https://image.tmdb.org/t/p/w500/`;
  const { apiData, handlefavoriteAPI, darkMode, setDarkMode } = useStateContext();

  const [nilaiOutput, setNilaiOutput] = useState<OutputDataFavorite>({
    home: true,
    showModal: false,
    apiDataPlaying: [],
    apiDataFavorite: [],
    selectedMovie: null,
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const homeButton = (): void => {
    navigate("/home");
  };

  const favoriteButton = (): void => {
    navigate("/favorite");
  };

  const modalBoxFunc = (item: null | Movie) => {
    setNilaiOutput((prevState) => ({ ...prevState, showModal: !prevState.showModal, selectedMovie: item }));
  };

  const deleteAPI = async (id: number) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are You Sure to Delete This Movie ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: darkMode ? "rgb(0 0 0)" : "red",
    }).then(async (result) => {
      try {
        if (result.value) {
          const response = await BaseUrl.delete(`/${id}`);
          if (response.status === 200) {
            Swal.fire({
              title: "Delete Movie",
              text: "You're Movie Been Deleted",
              icon: "success",
              confirmButtonText: "Ok",
              confirmButtonColor: darkMode ? "rgb(0 0 0)" : "rgb(13 148 136)",
            });
            handlefavoriteAPI();
          } else {
            alert("Failed Response");
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    const username = Cookies.get("username");
    if (!username) {
      Swal.fire({
        title: "Information",
        text: "You Have to Login & Subscribe",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      handlefavoriteAPI();
    }
  }, []);
  return (
    <>
      <section className="text-slate-100">
        {nilaiOutput.showModal && nilaiOutput.selectedMovie && (
          <div className="fixed inset-0 overflow-y-auto z-50  flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col h-auto sm:h-auto text-pretty lg:h-[65%] justify-center items-center bg-white sm:p-6 p-3 rounded-lg lg:w-1/2 w-9/12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full h-auto sm:h-full overflow-hidden">
                <div className="h-full">
                  <img src={poster + nilaiOutput.selectedMovie.poster_path} className="rounded-md h-[20vh] w-[70vw] sm:h-[80%] sm:w-full" height={30} alt="" />
                </div>
                <div className="flex-col flex sm:w-3/5 w-full items-start h-full justify-start gap-3">
                  <h2 className={`sm:text-xl text-base font-bold  text-white text-center py-4 w-full rounded-md ${!darkMode ? `bg-teal-600` : `bg-black`}`}>{nilaiOutput.selectedMovie.title}</h2>
                  <p className="text-slate-400 text-sm text-justify mb-4 rounded-md break-words -tracking-wide p-2">{nilaiOutput.selectedMovie.overview}</p>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <p className={darkMode ? `bg-black font-bold py-2 px-4` : nilaiOutput.selectedMovie.vote_average > 8 ? `text-white font-bold py-2 px-4 bg-green-400` : `text-white font-bold py-2 px-4 bg-yellow-500`}>
                  {nilaiOutput.selectedMovie.vote_average}
                </p>
                <span className=" cursor-pointer bg-slate-700 hover:bg-slate-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" onClick={() => modalBoxFunc(null)}>
                  Tutup
                </span>
              </div>
            </div>
          </div>
        )}

        <div className=" flex sm:flex-row flex-col justify-center items-center h-screen w-screen">
          <Left value={""} searchInput={undefined} mode={toggleDarkMode} homeButton={homeButton} favoriteButton={favoriteButton}>
            <div className="right mb-7 md:mb-0 sm:ml-2 w-screen overflow-y-auto lg:h-[92%] h-full flex flex-col justify-center items-center gap-2 ">
              <div className="h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-3 px-5">
                {apiData &&
                  apiData.map((item: any, index: number) => {
                    return <CardFavorite key={index} name={item.title} deskripsi={item.overview} gambar={poster + item.poster_path} rating={item.vote_average} detail={() => modalBoxFunc(item)} hapus={() => deleteAPI(item.id)} />;
                  })}
              </div>
            </div>
          </Left>

          {/* // */}
        </div>
      </section>
    </>
  );
};

export default Favorite;
