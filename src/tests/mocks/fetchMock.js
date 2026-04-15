import { jest } from "@jest/globals"; // 👈 ESSENCIAL

export function mockFetchSuccess(data) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data)
    })
  );
}

export function mockFetchError() {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false
    })
  );
}