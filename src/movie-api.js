import axios from "axios";



axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const ApiKey = "eyJhbGciOiJIUzI1NiJ9."
 + "eyJhdWQiOiI5ZDVhZTJhMDVmMGExMzMwNDU4M2NkZTNhYjVjNmQzZSIsIm5iZiI6MTc0NzQ4NjA0Ni42OTIsInN1YiI6IjY"
 + "4Mjg4NTVlMTQ1NDg4OWY0YjhiZmRlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ."
 + "e8Gw4dsvUncqtwluL_IogvAE2qJIEC2UH24TcLLpNlo";


export async function FetchMovie(searchWord) {
  const response = await axios.get(`search/movie`, {
     params: {
      query: searchWord,
      include_adult: false,
      language: 'en-US',
      page: 1
  },
      headers: {
          Authorization: `Bearer ${ApiKey}`
        }
  });

  return response.data.results;
}


export async function FetchTrendingMovie() {
  const response = await axios.get(`trending/movie/day`, {
      headers: {
          Authorization: `Bearer ${ApiKey}`
        }
  });

  return response.data.results;
}


export async function FetchMovieDetails(movieId) {
  const response = await axios.get(`movie/${movieId}`, {
      headers: {
          Authorization: `Bearer ${ApiKey}`
        }
  });

  return response.data;
}


export async function FetchMovieCast(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`, {
      headers: {
          Authorization: `Bearer ${ApiKey}`
        }
  });

  return response.data;
}


export async function FetchMovieReviews(movieId) {
  const response = await axios.get(`movie/${movieId}/reviews`, {
      headers: {
          Authorization: `Bearer ${ApiKey}`
        }
  });

  return response.data;
}

