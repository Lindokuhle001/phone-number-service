/** @jest-environment jsdom */
import PhoneNumberGenerator from "../PhoneNumberGenerator";
import { PhoneNumbersContext } from "../../../contexts/PhoneNumberContext";
import "@testing-library/jest-dom";
import DisplayPhoneNumbers from "../../DisplayPhoneNumbers/DisplayPhoneNumbers";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";


const validated = [
  {
    phoneNumber: "+22949475804",
    countryCode: "229",
    phoneNumberType: "UNKNOWN",
    isValid: true,
    isValidLength: true,
  },
];

const mockContextValue = {
  phoneNumbers: [],
  selectedCountry: {
    code: "ZA",
    name: "South Africa",
    dial_code: "+27",
    phone_length: 9,
  },
  results: {
    validated: [
      {
        phoneNumber: "+22935339997",
        countryCode: "229",
        phoneNumberType: "UNKNOWN",
        isValid: false,
        isValidLength: true,
      },
    ],
    numberOfGenerated: 0,
    generated: false,
    valid: 0,
  },
  showResults: false,
  errors: {
    error: false,
    message: "",
  },
  loading: false,
  updateLoading: () => {},

  updateShowResults: () => {},
  updateResults: () => {},
  updatePhoneNumbers: () => {},
  updateSelectedCountry: () => {},
  updateErrors: () => {},
};

describe("PhoneNumberGenerator Component", () => {
  it("renders without errors", () => {
    render(
      <PhoneNumbersContext.Provider value={mockContextValue}>
        <PhoneNumberGenerator />
      </PhoneNumbersContext.Provider>
    );
  });

  it("generates random phone numbers when the 'Generate' button is clicked", async () => {
    const { getByLabelText } = render(
      <PhoneNumbersContext.Provider value={mockContextValue}>
        <PhoneNumberGenerator />
        <DisplayPhoneNumbers />
      </PhoneNumbersContext.Provider>
    );

    const quantityInput = screen.getByPlaceholderText("Enter number");
    fireEvent.change(quantityInput, { target: { value: "5" } });

    const generateButton = getByLabelText("Generate");
    fireEvent.click(generateButton);

    expect(screen.getByText("Phone Number Table")).toBeInTheDocument();
  });

  it("submits phone numbers for validation when the 'Submit' button is clicked", async () => {
    const { getByLabelText } = render(
      <PhoneNumbersContext.Provider value={mockContextValue}>
        <PhoneNumberGenerator />
        <DisplayPhoneNumbers />
      </PhoneNumbersContext.Provider>
    );

    const quantityInput = screen.getByPlaceholderText("Enter number");
    fireEvent.change(quantityInput, { target: { value: "5" } });

    const generateButton = getByLabelText("Generate");
    fireEvent.click(generateButton);

    mockContextValue.results.generated = true;
    mockContextValue.results.validated = validated;

    const submitButton = getByLabelText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText("Phone Number Table"));

    expect(screen.getByText("Phone Number Table")).toBeInTheDocument();
  });
});
