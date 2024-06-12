import { Request, Response, NextFunction } from "express";
import WeatherService from "../services/weatherService";
import { ApiError } from "../errors/customErrors";

class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  public getWeather = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { country } = req.query as { country?: string };
      if (!country) {
        throw new ApiError(400, "Country is required");
      }

      const weatherData = await this.weatherService.getWeather({ country });
      res.json(weatherData);
    } catch (error) {
      next(error);
    }
  };
}

export default new WeatherController();
