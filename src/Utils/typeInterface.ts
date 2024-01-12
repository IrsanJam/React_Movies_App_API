import { Dispatch } from "react";
import { SetStateAction } from "react";

export interface Movie {
  id: any;
  judul: string;
  deskripsi: string;
  gambar: string;
  rating: number;
  title: string;
  poster_path: string;
  overview: string;
  original_title: string;
  vote_average: number;
}

export interface OutputData {
  home: boolean;
  showModal: boolean;
  apiDataPlaying: [];
  apiDataFavorite: [];
  searchData: string;
  selectedMovie: Movie | null;
}

export interface OutputDataFavorite {
  home: boolean;
  showModal: boolean;
  apiDataPlaying: [];
  apiDataFavorite: [];
  selectedMovie: Movie | null;
}

export interface MovieDetail {
  id: any;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genres: any;
  popularity: number;
  production_companies: any;
}

export interface dataFilm {
  name: string;
  gambar: string;
  deskripsi: string;
  rating: number;
  detail: () => void;
  addFavorit?: () => void;
  id: any;
}

export interface dataFilmFavorite {
  name: string;
  gambar: string;
  deskripsi: string;
  rating: number;
  detail: () => void;
  hapus: () => void;
}

export interface diri {
  username: string;
  password: number | string;
}

export interface ContextFavoritProps {
  children?: React.ReactNode;
  apiData?: any[];
  setApiData?: Dispatch<SetStateAction<any[]>>;
}
