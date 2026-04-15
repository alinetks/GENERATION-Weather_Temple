import { getCoordinates } from "../../js/api/geocodingApi.js";
import { mockFetchSuccess, mockFetchError } from "../mocks/fetchMock.js";

describe("getCoordinates", () => {

  // =========================
  // ✅ CASOS NORMAIS
  // =========================
  it("deve retornar coordenadas corretamente", async () => {
    mockFetchSuccess({
      results: [
        {
          name: "São Paulo",
          latitude: -23.55,
          longitude: -46.63,
          country: "Brasil"
        }
      ]
    });

    const result = await getCoordinates("São Paulo");

    expect(result.latitude).toBe(-23.55);
    expect(result.longitude).toBe(-46.63);
  });

  // =========================
  // 🚨 INPUT INVÁLIDO
  // =========================
  it("deve lançar erro para string vazia", async () => {
    await expect(getCoordinates(""))
      .rejects
      .toThrow();
  });

  it("deve lançar erro para apenas espaços", async () => {
    await expect(getCoordinates("   "))
      .rejects
      .toThrow();
  });

  it("deve lidar com caracteres especiais", async () => {
    mockFetchSuccess({
      results: [
        {
          name: "São Paulo",
          latitude: -23.55,
          longitude: -46.63,
          country: "Brasil"
        }
      ]
    });

    const result = await getCoordinates("São Paulo");

    expect(result.name).toBe("São Paulo");
  });

  // =========================
  // 🌍 RESPOSTA DA API
  // =========================
  it("deve lançar erro se cidade não encontrada", async () => {
    mockFetchSuccess({ results: [] });

    await expect(getCoordinates("xxx"))
      .rejects
      .toThrow("Cidade não encontrada");
  });

  it("deve lançar erro se não houver 'results'", async () => {
    mockFetchSuccess({});

    await expect(getCoordinates("London"))
      .rejects
      .toThrow("Cidade não encontrada");
  });

  it("deve lançar erro se API falhar", async () => {
    mockFetchError();

    await expect(getCoordinates("São Paulo"))
      .rejects
      .toThrow();
  });

});