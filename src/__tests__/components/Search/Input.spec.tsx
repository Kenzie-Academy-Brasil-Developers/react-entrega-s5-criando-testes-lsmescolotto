import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../../../components/Search";

describe("Search component input", () => {
  it("Should be at the page", () => {
    render(<Search />);

    const zipcodeInput = screen.getByPlaceholderText("Insira o CEP");

    expect(zipcodeInput).toBeInTheDocument();
  });
});
