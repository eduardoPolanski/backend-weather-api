import { z } from "zod";

const weatherSchema = z.object({
  country: z
    .string()
    .min(3, "Country name must be at least 3 characters long")
    .max(255, "Country name must be less than 255 characters long"),
});

export default {
  getWeather: {
    query: weatherSchema,
  },
};
