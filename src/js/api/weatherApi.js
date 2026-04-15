import { getWeatherDescription } from "../utils/helpers.js";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

/**
 * Gera uma chave única de cache com base nas coordenadas.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {string}
 */
function getCacheKey(latitude, longitude) {
  return `weather_${latitude}_${longitude}`;
}

/**
 * Salva dados no cache com timestamp.
 *
 * @param {string} key - Chave do cache
 * @param {any} data - Dados a serem armazenados
 */
function setCache(key, data) {
  const payload = {
    data,
    timestamp: Date.now()
  };

  localStorage.setItem(key, JSON.stringify(payload));
}

/**
 * Recupera dados do cache se ainda estiverem válidos.
 *
 * @param {string} key - Chave do cache
 * @returns {any|null} Retorna os dados ou null se expirado/inexistente
 */
function getCache(key) {
  const cached = localStorage.getItem(key);

  if (!cached) return null;

  try {
    const { data, timestamp } = JSON.parse(cached);

    const isExpired = Date.now() - timestamp > CACHE_TTL;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * Busca os dados meteorológicos com base nas coordenadas fornecidas.
 * Usa cache com expiração de 1 hora para evitar requisições desnecessárias.
 *
 * @async
 * @function getWeather
 * @param {{ latitude: number, longitude: number }} location
 * @returns {Promise<{
 *  temperature: number,
 *  windSpeed: number,
 *  windDirection: number,
 *  time: string,
 *  description: string
 * }>}
 *
 * @throws {Error} Lança erro se a API falhar ou retornar dados inválidos.
 */
export async function getWeather({ latitude, longitude }) {
  try {
    if (!latitude || !longitude) {
      throw new Error("Coordenadas inválidas");
    }

    const cacheKey = getCacheKey(latitude, longitude);

    // 🔍 1. Tenta usar cache
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      console.log("📦 Usando cache");
      return cachedData;
    }

    // 🌐 2. Faz requisição se não houver cache válido
    const params = new URLSearchParams({
      latitude,
      longitude,
      current_weather: true,
      timezone: "auto",
      current_weather: "true"
    });

    const response = await fetch(`${WEATHER_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar clima");
    }

    const data = await response.json();
    const normalized = normalizeWeather(data);

    // 💾 3. Salva no cache
    setCache(cacheKey, normalized);

    return normalized;

  } catch (error) {
    throw error;
  }
}

/**
 * Normaliza os dados retornados pela API.
 *
 * @param {any} data
 * @returns {{
 *  temperature: number,
 *  windSpeed: number,
 *  windDirection: number,
 *  time: string,
 *  description: string
 * }}
 */
function normalizeWeather(data) {
  if (!data.current_weather) {
    throw new Error("Dados de clima inválidos");
  }

  const w = data.current_weather;

  return {
    temperature: w.temperature,
    windSpeed: w.windspeed,
    windDirection: w.winddirection,
    time: w.time,
    description: getWeatherDescription(w.weathercode)
  };
}