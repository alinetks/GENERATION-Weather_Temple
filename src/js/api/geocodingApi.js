const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

/**
 * Busca as coordenadas geográficas de uma cidade usando a API de geocodificação.
 *
 * @async
 * @function getCoordinates
 * @param {string} city - Nome da cidade a ser buscada.
 * @returns {Promise<{ name: string, country: string, latitude: number, longitude: number }>}
 * Retorna um objeto com nome, país, latitude e longitude.
 * @throws {Error} Lança erro se a cidade não for encontrada ou se a API falhar.
 */
export async function getCoordinates(city) {
  if (!city || !city.trim()) {
    throw new Error("Cidade inválida");
  }
  try {
    const response = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`);

    if (!response.ok) throw new Error("Erro ao buscar localização");

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("Cidade não encontrada");
    }

    const place = data.results[0];

    return {
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      country: place.country
    };

  } catch (error) {
    throw error;
  }

}