import { useState, useContext, createContext, FC } from "react";
import Swal from "sweetalert2";
import BaseUrl from "axios";
import { ContextFavoritProps } from "../Utils/typeInterface";

interface ExtendedContextProps extends ContextFavoritProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const stateContext = createContext({} as ExtendedContextProps);

export const useStateContext = () => {
  const context: any = useContext(stateContext);
  const { apiData, darkMode, setDarkMode } = context;

  const handlefavoriteAPI = async () => {
    try {
      const response = await BaseUrl.get(``);
      context.setApiData(response.data);
    } catch (error) {
      Swal.fire({
        title: "Your API Error",
        text: "Please check your Connection",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return {
    apiData,
    darkMode,
    setDarkMode,
    handlefavoriteAPI,
  };
};

export const StateProvider: FC<ContextFavoritProps> = ({ children }) => {
  const [apiData, setApiData] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return <stateContext.Provider value={{ apiData, setApiData, darkMode, setDarkMode }}>{children}</stateContext.Provider>;
};
