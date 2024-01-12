import { useState, useEffect, FC } from "react";
import Card from "../Components/Card";
import optionsHome from "../Data/optionsPopular";
import BaseUrl from "axios";
import { useNavigate } from "react-router-dom";
import Left from "../Components/Left";
import { OutputData } from "../Utils/typeInterface";
import { Movie } from "../Utils/typeInterface";
import BaseTMDB from "axios";
import Swal from "sweetalert2";
import "../custom.css";
import Cookies from "js-cookie";
import { NotFound } from "../Components/NotFound";
import { useStateContext } from "../context/ModeContext";

const Home: FC = () => {
  const api_key = import.meta.env.VITE_MOVIE_KEY;
  const poster = `https://image.tmdb.org/t/p/w500/`;
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useStateContext();

  const [nilaiOutput, setNilaiOutput] = useState<OutputData>({
    home: true,
    showModal: false,
    apiDataPlaying: [],
    apiDataFavorite: [],
    selectedMovie: null,
    searchData: "",
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const homeButton = (): void => {
    setNilaiOutput((prev) => ({ ...prev, searchData: "" }));
    homeAPI();
    navigate("/home");
  };

  const favoriteButton = (): void => {
    navigate("/favorite");
  };

  const homeAPI = async () => {
    try {
      const response = await BaseTMDB.request(optionsHome);
      setNilaiOutput((prevNilai) => ({ ...prevNilai, apiDataPlaying: response.data.results }));
    } catch (error) {
      Swal.fire({
        title: "Your API Error",
        text: "Please check your Connection",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const searchAPI = async () => {
    if (nilaiOutput.searchData !== "") {
      try {
        const response = await BaseTMDB.get(`https://api.themoviedb.org/3/search/movie?query=${nilaiOutput.searchData}&api_key=${api_key}`);
        setNilaiOutput((prevNilai) => ({ ...prevNilai, apiDataPlaying: response.data.results }));
        if (response.data.results.length === 0) {
          Swal.fire({
            title: "No Data",
            text: "Please fill the right movie title",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "rgb(13 148 136)",
          }).then((result) => {
            if (result.value) {
              setNilaiOutput((prev) => ({ ...prev, searchData: "" }));
              homeAPI();
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Your API Error",
          text: "Please check your Connection",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      homeAPI();
    }
  };

  const kirimAPI = async (item: Movie) => {
    const { title, original_title, overview, vote_average, poster_path, id } = item;
    Swal.fire({
      title: "Confirmation",
      text: "Are You Sure to add This Movie to Favorite ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: darkMode ? "rgb(0 0 0)" : "rgb(13 148 136)",
    }).then(async (result) => {
      try {
        if (result.value) {
          await BaseUrl.post(``, { title, original_title, overview, vote_average, poster_path, id })
            .then(() => {
              Swal.fire({
                title: "Your Movie was Added to Favorite",
                text: "Do you wanna Check you're Favorit List ?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                confirmButtonColor: darkMode ? "rgb(0 0 0)" : "rgb(13 148 136)",
              }).then((result) => {
                if (result.value) {
                  navigate("/favorite");
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (error) {}
    });
  };

  const modalBoxFunc = (item: null | Movie) => {
    setNilaiOutput((prevState) => ({ ...prevState, showModal: !prevState.showModal, selectedMovie: item }));
    if (item) {
      navigate(`/detail/${item.id}`, {
        state: {
          id: `${item.id}`,
        },
      });
    }
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
      searchAPI();
    }
  }, []);

  return (
    <>
      <section className="text-slate-100">
        <div className=" flex sm:flex-row flex-col justify-center items-center h-screen w-screen">
          <Left value={nilaiOutput.searchData} searchInput={(e: any) => setNilaiOutput((prev) => ({ ...prev, searchData: e.target.value }))} mode={toggleDarkMode} homeButton={homeButton} favoriteButton={favoriteButton} search={searchAPI}>
            <div className="right mb-7 md:mb-0 sm:ml-2 w-screen overflow-y-auto lg:h-[92%] h-full flex flex-col justify-center items-center gap-2 ">
              <div className="h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-3 px-5">
                {nilaiOutput.apiDataPlaying.length > 0 ? (
                  nilaiOutput.apiDataPlaying.map((item: any, index: number) => (
                    <Card
                      key={index}
                      id={item.id}
                      name={item.title}
                      deskripsi={item.overview}
                      gambar={item?.poster_path ? poster + item?.poster_path : `https://via.placeholder.com/300x200/CCCCCC/000000?text=Image Not Found`}
                      rating={item.vote_average}
                      detail={() => modalBoxFunc(item)}
                      addFavorit={() => kirimAPI(item)}
                    />
                  ))
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </Left>
          {/* // */}
        </div>
      </section>
    </>
  );
};

export default Home;
