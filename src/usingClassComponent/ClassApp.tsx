import { Component } from "react";
import Card from "./Components/ClassCard";
import axios from "axios";
import optionsPopular from "../Data/optionsPopular";
import favoriteMovies from "../Data/favoriteMovies";

interface Movie {
  judul: string;
  deskripsi: string;
  gambar: string;
  rating: number;
  title: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
}

interface OutputData {
  play: boolean;
  showModal: boolean;
  selectedMovie: Movie | null;
  apiDataPlaying: [];
  apiDataFavorite: [];
}

export class App extends Component<{}, OutputData> {
  state: OutputData = {
    play: true,
    showModal: false,
    selectedMovie: null,
    apiDataPlaying: [],
    apiDataFavorite: [],
  };

  playButton = () => {
    const { play } = this.state;
    if (play === true) {
      play;
    } else {
      this.setState({ play: !play });
    }
  };

  favoriteButton = () => {
    const { play } = this.state;
    if (play === false) {
      play;
    } else {
      this.setState({ play: !play });
    }
  };

  toggleModal = (item: Movie | null) => {
    this.setState(() => ({
      showModal: !this.state.showModal,
      selectedMovie: item,
    }));
  };

  playingAPI() {
    axios
      .request(optionsPopular)
      .then((response) => {
        this.setState({ apiDataPlaying: response.data.results });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  favoriteAPI() {
    axios
      .request(favoriteMovies)
      .then((response) => {
        this.setState({ apiDataFavorite: response.data.results });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  componentDidMount(): void {
    this.playingAPI();
    this.favoriteAPI();
  }

  render() {
    const poster = `https://image.tmdb.org/t/p/w500/`;
    return (
      <>
        <section>
          {this.state.showModal && this.state.selectedMovie && (
            <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="relative flex flex-col h-[60%] sm:h-[60%] lg:h-[80%] justify-center items-center bg-white p-6 rounded-lg lg:w-1/4 w-9/12">
                <img src={poster + this.state.selectedMovie.poster_path} className="h-[80%] w-full" height={30} alt="" />
                <h2 className="sm:text-xl text-base font-bold my-4 text-white text-center py-4 px-5 w-full rounded-md bg-green-500">{this.state.selectedMovie.title}</h2>
                <p className="text-gray-500  mb-4 text-center tracking-tight">{this.state.selectedMovie.original_title}</p>

                <div className="flex justify-center items-center">
                  <p className={this.state.selectedMovie.vote_average > 8 ? `text-white font-bold py-2 px-4 bg-green-400` : `text-white font-bold py-2 px-4 bg-yellow-500`}>{this.state.selectedMovie.vote_average}</p>
                  <span className=" cursor-pointer bg-slate-700 hover:bg-slate-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" onClick={() => this.toggleModal(null)}>
                    Tutup
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className=" flex sm:flex-row flex-col justify-center items-center h-screen w-screen">
            <div className="left bg-teal-600 h-1/3 sm:h-full flex flex-col justify-center items-center border-r-2 border-slate-400  sm:w-[50%] lg:w-[35%] w-screen shadow-md">
              <span className=" font-bold text-3xl drop-shadow-md">Movies App</span>
              {/* <div className="search h-14 rounded-lg w-72 bg-slate-100 flex justify-between items-center  my-5 ">
                <div className="icon-search flex flex-col w-1/4 h-full justify-center items-center">
                  <img width="24" height="24" src="https://img.icons8.com/cotton/64/000000/search--v1.png" alt="search--v1" />
                </div>
                <input type="text" className="bg-slate-50 w-full h-[3.1rem] text-black rounded-lg text-center font-semibold border-b-slate-500 mr-1" />
              </div> */}

              <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 w-11/12 my-5 px-3">
                <button className=" shadow-md  px-4 py-3 lg:py-8 bg-slate-200 flex justify-center items-center opacity-95" onClick={this.playButton}>
                  <img className="h-8 lg:h-10" src="https://img.icons8.com/3d-fluency/94/film-reel.png" alt="film-reel" />
                  <span className="ml-2 text-2xl font-bold text-white drop-shadow-md "> Home</span>
                </button>
                <button className="shadow-md  px-4 py-3 lg:py-8 bg-slate-200 flex justify-center items-center opacity-95" onClick={this.favoriteButton}>
                  <img className="h-8 lg:h-10" src="https://img.icons8.com/3d-fluency/94/love-circled.png" alt="love-circled" />
                  <span className="ml-2 text-2xl font-bold text-white drop-shadow-md"> Favorite</span>
                </button>
              </div>
              <hr />
            </div>

            <div className="right sm:ml-2 w-screen overflow-y-auto lg:h-[92%] h-full flex flex-col justify-center items-center gap-2 ">
              {/* <h1 className="font-bold ">{this.state.play === false ? "Favorite Movies" : `Playing Movies`}</h1> */}
              {this.state.play === false ? (
                <div className="h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-3 px-3">
                  {this.state.apiDataFavorite &&
                    this.state.apiDataFavorite.map((item: any, index: number) => {
                      return <Card key={index} name={item.title} deskripsi={item.original_title} gambar={poster + item.poster_path} rating={item.vote_average} detail={() => this.toggleModal(item)} />;
                    })}
                </div>
              ) : (
                <div className="h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-3 px-5">
                  {this.state.apiDataPlaying &&
                    this.state.apiDataPlaying.map((item: any, index: number) => {
                      return <Card key={index} name={item.title} deskripsi={item.original_title} gambar={poster + item.poster_path} rating={item.vote_average} detail={() => this.toggleModal(item)} />;
                    })}
                </div>
              )}
            </div>

            {/* // */}
          </div>
        </section>
      </>
    );
  }
}

export default App;
