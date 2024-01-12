const options: any = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/top_rated",
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTUwMjc2YzRlMGIyMTAxMDE3YzkzM2JkNmYwMjVjZSIsInN1YiI6IjY0MzdjZDAwODFhN2ZjMDEyNzcxMWEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3-_vQPQrODQO-qluQ3cnbxHl1PtzBUszKYXDhGb8jBY",
  },
};

export default options;
