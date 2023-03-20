import { SPOON_API_KEY } from "@/config/key";
import Axios from "axios";
import { makeUseAxios } from "axios-hooks";

const axios = Axios.create({
  baseURL: "https://api.spoonacular.com/",
  params: {
    apiKey: SPOON_API_KEY,
  },
});

export default makeUseAxios({ axios });
