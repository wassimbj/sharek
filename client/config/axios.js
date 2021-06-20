import axios from "axios";

const axi = axios.create({
  baseURL: "http://localhost:1234",
  withCredentials: true,
  // headers: {
  //    'X-CSRF-TOKEN': Cookies.get('csrfToken'),
  // }
});

export default axi;
