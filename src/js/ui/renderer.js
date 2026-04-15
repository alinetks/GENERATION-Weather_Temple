/**
 * Renderiza os dados do clima na interface.
 *
 * @function renderWeather
 * @param {{ city: string, temperature: number, windSpeed: number, description: string }} data
 */
export function renderWeather(data) {
  const container = document.getElementById("app");

  container.innerHTML = `
      <h2>${data.city}</h2>
      <p>🌡️ ${data.temperature}°C</p>
      <p>🧭 ${data.windDirection}°</p>
      <p>💨 ${data.windSpeed} km/h</p>
      <small>${data.time}</small>
      <p>Condição: ${data.description}</p>
    `;
}

/**
 * Exibe uma mensagem de erro na interface.
 *
 * @function renderError
 * @param {string} message - Mensagem de erro a ser exibida.
 */
export function renderError(message) {
  document.getElementById("app").innerHTML = `
    <p style="color:red;">Erro: ${message}</p>
  `;
}

/**
 * Controla o estado de carregamento da interface.
 *
 * @function setLoading
 * @param {boolean} isLoading - Define se o loading está ativo ou não.
 */
export function setLoading(isLoading) {
  const el = document.getElementById("loading");

  if (el) {
    el.style.display = isLoading ? "block" : "none";
  }
}