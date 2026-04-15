import { jest } from "@jest/globals"; // 👈 necessário aqui também
import { getCoordinates } from "../../js/api/geocodingApi.js";
import { getWeather } from "../../js/api/weatherApi.js";

it("deve buscar clima a partir do nome da cidade", async () => {
  global.fetch = jest
    .fn()
    // 1ª chamada → geocoding
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            name: "London",
            latitude: 51.5,
            longitude: -0.12,
            country: "UK"
          }
        ]
      })
    })
    // 2ª chamada → weather
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current_weather: {
          temperature: 20,
          windspeed: 5,
          winddirection: 100,
          time: "2026-01-01"
        }
      })
    });

  const location = await getCoordinates("London");
  const weather = await getWeather(location);

  expect(weather.temperature).toBeDefined();
});