/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomButton from "../elements/CustomButton";
import CustomImage from "../elements/CustomImage";
import CustomInput from "../elements/CustomInput";
import CustomText from "../elements/CustomText";
import Snackbar, { showSnackbar } from "../elements/Snackbar";

describe("CustomButton", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<CustomButton>Hello</CustomButton>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <CustomButton onClick={handleClick}>Clickable Button</CustomButton>
    );
    fireEvent.click(getByText("Clickable Button"));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe("CustomImage", () => {
  it("renders image with correct src and alt", () => {
    const src = "image.jpg";
    const alt = "Test Image";
    const { getByAltText } = render(<CustomImage src={src} alt={alt} />);
    const image = getByAltText(alt);
    expect(image).toHaveAttribute("src", src);
  });

  it("applies style correctly", () => {
    const style = { width: "100px", height: "auto" };
    const { getByAltText } = render(
      <CustomImage src="image.jpg" alt="Test Image" style={style} />
    );
    const image = getByAltText("Test Image");
    expect(image).toHaveStyle("width: 100px");
    expect(image).toHaveStyle("height: auto");
  });
});

describe("CustomInput", () => {
  it("renders input with correct props", () => {
    const placeholder = "Enter text";
    const { getByPlaceholderText } = render(
      <CustomInput placeholder={placeholder} />
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it("calls onChange function when input value changes", () => {
    const handleChange = jest.fn();
    const placeholder = "Enter text";
    const { getByPlaceholderText } = render(
      <CustomInput placeholder={placeholder} onChange={handleChange} />
    );
    const input = getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "New value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("autofocuses correctly when autoFocus is true", () => {
    const { getByPlaceholderText } = render(
      <CustomInput autoFocus placeholder="Enter text" />
    );
    const input = getByPlaceholderText("Enter text");
    expect(input).toHaveFocus();
  });
});

describe("CustomText", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<CustomText>Hello, world!</CustomText>);
    expect(getByText("Hello, world!")).toBeInTheDocument();
  });

  it("applies className correctly", () => {
    const { getByText } = render(
      <CustomText className="custom-text">Styled Text</CustomText>
    );
    const text = getByText("Styled Text");
    expect(text).toHaveClass("custom-text");
  });
});
