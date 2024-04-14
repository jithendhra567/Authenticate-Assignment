import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import API_ENDPOINTS from "../utils/apiEndPoints";
import { getRequest } from "../utils/common";

test("check login to register flow", () => {
  render(<App />);
  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();

  const enterHereInput = screen.getByPlaceholderText("Enter here");
  fireEvent.change(enterHereInput, { target: { value: "RandomName" } });

  const loginButton = screen.getByText("Login");
  fireEvent.click(loginButton);

  const registerPageHeading = screen.getByText("Register");
  expect(registerPageHeading).toBeInTheDocument();
});

test("Movie Details API", async () => {
  const movieId = "tt2911666";
  const url = API_ENDPOINTS.baseUrl + API_ENDPOINTS.movieDetails + movieId;
  const data = await getRequest(url);
  const title = data.Title;
  expect(title).toBe("John Wick");
});

test("Movie Search API", async () => {
  const text = "john";
  const url = API_ENDPOINTS.baseUrl + API_ENDPOINTS.search + text;
  const data = await getRequest(url);
  const title = data.Search[0].Title;
  expect(title).toBe("John Wick");
});
