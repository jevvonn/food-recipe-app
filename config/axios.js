import axios from "axios";
import { SPOON_API_KEY } from "./key";

axios.defaults.baseURL = "https://api.spoonacular.com/";
axios.defaults.params = {
  apiKey: SPOON_API_KEY,
};

export default axios;
