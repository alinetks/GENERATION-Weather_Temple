/**
 * Mapa de códigos de clima da API Open-Meteo para descrições amigáveis.
 *
 * @type {Record<number, string>}
 */
export const WEATHER_CODES = {
    0: "Céu limpo ☀️",
    1: "Principalmente limpo 🌤️",
    2: "Parcialmente nublado ⛅",
    3: "Nublado ☁️",
    45: "Nevoeiro 🌫️",
    48: "Nevoeiro com geada 🌫️",
    51: "Garoa leve 🌦️",
    53: "Garoa moderada 🌦️",
    55: "Garoa intensa 🌧️",
    61: "Chuva leve 🌧️",
    63: "Chuva moderada 🌧️",
    65: "Chuva forte 🌧️",
    80: "Pancadas de chuva 🌦️",
    95: "Tempestade ⛈️"
  };
  
  /**
   * Retorna a descrição do clima com base no código.
   *
   * @param {number} code
   * @returns {string}
   */
  export function getWeatherDescription(code) {
    return WEATHER_CODES[code] || "Condição desconhecida";
  }