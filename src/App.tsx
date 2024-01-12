import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Favorite from "./Pages/Favorite";
import Detail from "./Pages/Detail";
import BaseUrl from "axios";
import BaseTMDB from "axios";
import Login from "./Pages/Auth/Login";

function App() {
  BaseTMDB.defaults.baseURL = `https://api.themoviedb.org/3`;
  BaseUrl.defaults.baseURL = `https://658c0031859b3491d3f54070.mockapi.io/Movies`;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
