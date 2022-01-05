import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../../../components/Search";

describe("Search component button", () => {
  it("Should be in the page", () => {
    render(<Search />);

    const searchButton = screen.getByRole("button");

    expect(searchButton).toBeInTheDocument();
  });
});
