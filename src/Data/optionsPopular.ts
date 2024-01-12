const token = import.meta.env.VITE_TOKEN;

const options: any = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `${token}`,
  },
};

export default options;
