import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import api from "./services";
import App from "./App";
import MockAdapter from "axios-mock-adapter";
import Providers from "./providers";
import Search from "./components/Search";
import Cep from "./components/Cep";
import { act } from "react-dom/test-utils";
import { Toaster } from "react-hot-toast";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const apiMock = new MockAdapter(api);

describe("Website main page", () => {
  it("Should be able to add a brazilian zipcode, that contains 8 characters", async () => {
    render(
      <Providers>
        <App />
      </Providers>
    );
    const zipcodeField = screen.getByPlaceholderText("Insira o CEP");
    const searchButton = screen.getByText("Buscar pelo CEP");

    fireEvent.change(zipcodeField, { target: { value: 88080160 } });
    fireEvent.click(searchButton);

    expect(zipcodeField).toHaveValue(88080160);
  });

  it("Should not be able to add an invalid brazilian zipcode", async () => {
    render(
      <Providers>
        <Toaster />
        <Search />
        <Cep />
      </Providers>
    );

    apiMock.onGet("").replyOnce(404, {});

    const zipcodeField = screen.getByPlaceholderText("Insira o CEP");
    const searchButton = screen.getByText("Buscar pelo CEP");

    await act(async () => {
      fireEvent.change(zipcodeField, { target: { value: 11111111 } });
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Ops! CEP não encontrado...")
      ).toBeInTheDocument();
    });
  });
});
