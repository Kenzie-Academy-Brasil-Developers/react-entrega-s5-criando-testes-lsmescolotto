import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Providers from "./providers";
import App from "./App";

describe("Website main page", () => {
  test("Should be able to add a brazilian zipcode, that contains 8 characters", () => {
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
});
