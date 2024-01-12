import { FC, useEffect, useState } from "react";
import { diri } from "../../Utils/typeInterface";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import gambarLogin from "../../img/icons8-login-64.png";

const Login: FC = () => {
  const dataDiri: diri = {
    username: "irsan",
    password: "admin1",
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string | number>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username === dataDiri.username && password === dataDiri.password) {
      Swal.fire({
        title: "Confirmation",
        text: "Congratulations, Hello Admin",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(13 148 136)",
      }).then((res) => {
        if (res.isConfirmed) {
          Cookies.set("username", username);
          navigate("/home");
        }
      });
    } else {
      Swal.fire({
        title: "Confirmation",
        text: "Username and Password Was Wrong",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then(() => {
        setPassword("");
        setUsername("");
      });
    }
  };

  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <section onSubmit={handleSubmit} className="text-slate-400 h-screen w-screen flex flex-col justify-center items-center">
        <img src="https://miro.medium.com/v2/resize:fit:1142/1*eYtze01BE5EzuxR_1qT9SA.jpeg" alt="" className="relative bg-cover mix-blend-soft-light   h-screen w-screen" />
        <div className="h-screen w-screen bg-teal-300 opacity-20 z-[7] absolute"></div>
        <div className="bg-slate-50 border-[1.5px]  border-teal-600 rounded-md flex flex-col items-center justify-center absolute shadow-lg z-20 w-[80%] sm:w-auto px-10 py-6">
          <img width="64" height="64" src={gambarLogin} alt="external-login-100-most-used-icons-flaticons-flat-flat-icons" />
          <span className="font-semibold text-4xl">Login</span>
          <div className="flex justify-center items-center flex-col mt-5">
            <form action="" className="flex flex-col gap-5">
              <input type="text" placeholder="Masukan Username" className=" border-[1px] border-slate-200 w-full py-2 bg-white rounded-md text-center" onChange={(e) => setUsername(e.target.value)} value={username} />
              <input type="password" placeholder="Masukan Password" onChange={(e) => setPassword(e.target.value)} className="border-[1px] border-slate-200 w-[17rem] sm:w-[20rem] py-2 bg-white rounded-md text-center" value={password} />
              <button type="submit" className="bg-teal-600 mx-16 font-semibold text-white">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
