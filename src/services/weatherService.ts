import axios, { AxiosError } from "axios";

import { ApiError } from "../errors/customErrors";
import { ResponseWeather } from "../types/weather";
import { z } from "zod";
import weatherValidators from "../validators/weatherValidators";

class WeatherService {
  public async getWeather(
    query: z.infer<(typeof weatherValidators)["getWeather"]["query"]>
  ) {
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = process.env.WEATHER_API_URL;

    try {
      const response = await axios.get<ResponseWeather>(apiUrl!, {
        params: {
          key: apiKey,
          q: query.country,
        },
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          throw new ApiError(400, "Country not found");
        }
      }
      throw new ApiError(500, "Error fetching weather data");
    }
  }
}

export default WeatherService;
