// import axios from "axios";

export default function ({ $axios }, inject) {
  const base_api = $axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
      api_key: process.env.API_KEY,
      language: "ko",
    },
  });

  const image_url = "https://image.tmdb.org/t/p/w500";

  inject("base_api", base_api);
  inject("image_url", image_url);
}
