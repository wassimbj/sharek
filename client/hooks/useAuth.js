import axi from "config/axios";
import {useQuery} from "react-query";

export default function useAuth() {
  const {isLoading, isError, data, error} = useQuery("isLoggedIn", () => axi.get("/isauth"));

  return {
    isLoading,
    isError,
    user: data,
    isLoggedIn: !isLoading && !!data.data
  }
}
