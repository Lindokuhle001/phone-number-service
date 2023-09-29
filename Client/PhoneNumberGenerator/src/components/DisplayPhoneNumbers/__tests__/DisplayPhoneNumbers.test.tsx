/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import DisplayPhoneNumbers from "../DisplayPhoneNumbers";
import { PhoneNumbersContext } from "../../../contexts/PhoneNumberContext";
import "@testing-library/jest-dom";

const samplePhoneNumbersContext = {
  phoneNumbers: [{ phoneNumber: "" }],
  selectedCountry: {
    name: "Select a country",
    code: "+27",
    dial_code: "",
    phone_length: 0,
  },
  results: {
    validated: [
      {
        phoneNumber: "+22949475804",
        countryCode: "229",
        phoneNumberType: "UNKNOWN",
        isValid: true,
        isValidLength: true,
      },
    ],
    numberOfGenerated: 100,
    generated: true,
    valid: 50,
  },
  showResults: true,
  loading: false,
  errors: {
    error: false,
    message: "",
  },
  updateLoading: jest.fn(),
  updateShowResults: jest.fn(),
  updateResults: jest.fn(),
  updatePhoneNumbers: jest.fn(),
  updateSelectedCountry: jest.fn(),
  updateErrors: jest.fn(),
};
const resultText =
  "Out of the 100 numbers generated, 50 were found to be valid for the country, which calculates to 50.00% valid results";

describe("DisplayPhoneNumbers Component", () => {
  it("renders without errors", () => {
    render(
      <PhoneNumbersContext.Provider value={samplePhoneNumbersContext}>
        <DisplayPhoneNumbers />
      </PhoneNumbersContext.Provider>
    );
    expect(
      screen.getByText(resultText)
    ).toBeInTheDocument();
  });

  it("renders loading screen when loading is true", () => {
    const loadingContext = { ...samplePhoneNumbersContext, loading: true };
    render(
      <PhoneNumbersContext.Provider value={loadingContext}>
        <DisplayPhoneNumbers />
      </PhoneNumbersContext.Provider>
    );

    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    const errorContext = {
      ...samplePhoneNumbersContext,
      errors: { error: true, message: "Error message" },
    };
    render(
      <PhoneNumbersContext.Provider value={errorContext}>
        <DisplayPhoneNumbers />
      </PhoneNumbersContext.Provider>
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("handles previous page button click", () => {
    render(
      <PhoneNumbersContext.Provider value={samplePhoneNumbersContext}>
        <DisplayPhoneNumbers />
      </PhoneNumbersContext.Provider>
    );
    fireEvent.click(screen.getByText("Previous"));
  });

});
