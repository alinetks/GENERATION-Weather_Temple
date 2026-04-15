import { renderWeather, renderError } from "../../js/ui/renderer.js";

it("deve renderizar dados no DOM", () => {
  document.body.innerHTML = `<div id="app"></div>`;

  renderWeather({
    city: "São Paulo",
    temperature: 25,
    windSpeed: 10,
    windDirection: 180,
    time: "2026-01-01"
  });

  expect(document.getElementById("app").innerHTML)
    .toContain("São Paulo");
});