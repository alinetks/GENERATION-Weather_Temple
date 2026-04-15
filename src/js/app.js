import { getCoordinates } from "./api/geocodingApi.js";
import { getWeather } from "./api/weatherApi.js";
import { renderWeather, renderError, setLoading } from "./ui/renderer.js";

/**
 * Manipula o fluxo completo da busca de clima.
 *
 * @async
 * @function handleSearch
 * @param {string} city - Nome da cidade digitada pelo usuário.
 * @returns {Promise<void>}
 *
 * Fluxo:
 * 1. Ativa loading
 * 2. Busca coordenadas
 * 3. Busca clima
 * 4. Renderiza resultado
 * 5. Trata erros
 * 6. Finaliza loading
 */
export async function handleSearch(city) {
  console.log("Cidade digitada:", city); // 👈 teste
  try {
    setLoading(true);

    const location = await getCoordinates(city);
    const weather = await getWeather(location);
    console.log("location: ", location);
    console.log("weather: ", weather);

    renderWeather({
      city: `${location.name}, ${location.country}`,
      ...weather
    });

  } catch (error) {
    renderError(error.message);
  } finally {
    setLoading(false);
  }
}

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = input.value.trim();

  if (!city) return;

  handleSearch(city); // 👈 AQUI chama sua função
});