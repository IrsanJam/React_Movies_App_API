import { useState, useEffect, FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BaseTMDB from "axios";
import { MovieDetail } from "../Utils/typeInterface";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Left from "../Components/Left";
import { DetailCard } from "../Components/DetailCard";
import { useStateContext } from "../context/ModeContext";

const Detail: FC = () => {
  const { darkMode, setDarkMode } = useStateContext();
  const api_key = import.meta.env.VITE_MOVIE_KEY;
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const location = useLocation();
  const id = location.state.id;
  const username = Cookies.get("username");

  const fetchData = async () => {
    const username = Cookies.get("username");
    if (username) {
      try {
        const response = await BaseTMDB.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
        setMovie(response.data);
      } catch (error) {
        setMovie(null);
      }
    } else {
      Swal.fire({
        title: "Information",
        text: "You Need To Pay for This Menu",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then(() => {
        navigate("/home");
      });
    }
  };

  useEffect(() => {
    if (!username && id === null) {
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
      fetchData();
    }
  }, [username, id]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const homeButton = (): void => {
    navigate("/home");
  };

  const favoriteButton = (): void => {
    navigate("/favorite");
  };

  const poster = `https://image.tmdb.org/t/p/w500/`;

  return (
    <>
      <section className="text-slate-100">
        <div className=" flex sm:flex-row flex-col justify-center items-center h-screen w-screen">
          <Left value="" mode={toggleDarkMode} search={undefined} homeButton={homeButton} favoriteButton={favoriteButton}>
            <div className="right sm:ml-2 w-screen  overflow-y-auto lg:h-[92%] h-full flex flex-col justify-center items-center gap-2  ">
              <div className=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 items-center justify-center gap-3 lg:px-5 px-0">
                {movie === null ? (
                  <div>Data Not Found</div>
                ) : (
                  <DetailCard
                    id={movie.id}
                    poster_path={poster + movie.poster_path}
                    title={movie.title}
                    overview={movie.overview}
                    vote_average={movie.vote_average}
                    release_date={movie.release_date}
                    genres={movie.genres[0].name}
                    popularity={movie.popularity}
                    production_companies={movie.production_companies[0].name}
                  />
                )}
              </div>
            </div>
          </Left>
        </div>
      </section>
    </>
  );
};

export default Detail;
