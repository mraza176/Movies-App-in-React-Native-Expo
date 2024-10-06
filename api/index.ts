import axios from "axios";

export const getLatestMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_LATEST_MOVIES_URL}?limit=10`
    );
    return response.data.data.movies;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovie = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_MOVIE_URL}?movie_id=${movieId}&with_images=true&with_cast=true`
    );
    return response.data.data.movie;
  } catch (error) {
    console.error(error);
    return {};
  }
};
