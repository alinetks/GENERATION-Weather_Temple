import { getWeather } from "../../js/api/weatherApi.js";
import { mockFetchSuccess } from "../mocks/fetchMock.js";

describe("getWeather", () => {

  // =========================
  // ✅ CASO NORMAL
  // =========================
  it("deve retornar dados normalizados", async () => {
    mockFetchSuccess({
      current_weather: {
        temperature: 25,
        winddirection: 180,
        windspeed: 10,
        time: "2026-01-01",
        weathercode: 0 // 👈 novo
      }
    });

    const result = await getWeather({
      latitude: -23.55,
      longitude: -46.63
    });

    expect(result).toEqual({
      temperature: 25,
      windDirection: 180,
      windSpeed: 10,
      time: "2026-01-01",
      description: expect.any(String) 
    });
  });

  // =========================
  // 🌍 RESPOSTA INVÁLIDA
  // =========================
  it("deve lançar erro se não houver current_weather", async () => {
    mockFetchSuccess({});

    await expect(
      getWeather({ latitude: 1, longitude: 2 })
    ).rejects.toThrow();
  });

  // =========================
  // ⚠️ DADOS INCONSISTENTES
  // =========================
  it("deve lidar com temperatura null", async () => {
    mockFetchSuccess({
      current_weather: {
        temperature: null,
        windspeed: 10,
        winddirection: 100,
        time: "2026-01-01"
      }
    });

    const result = await getWeather({
      latitude: 1,
      longitude: 2
    });

    expect(result.temperature).toBeNull();
  });

  it("deve lidar com tipos incorretos", async () => {
    mockFetchSuccess({
      current_weather: {
        temperature: "25",
        windspeed: "10",
        winddirection: "100",
        time: "2026-01-01"
      }
    });

    const result = await getWeather({
      latitude: 1,
      longitude: 2
    });

    expect(result.temperature).toBeDefined();
  });

});