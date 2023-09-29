/** @jest-environment jsdom */
import { render, fireEvent, screen } from "@testing-library/react";
import CustomerSelector from "../CustomSelector";
import '@testing-library/jest-dom'

const mockUpdateSelectedCountry = jest.fn();

const countries = [
  { name: "Country 1", dial_code: "+1", code: "", phone_length: 10 },
  {
    name: "Select a country",
    code: "",
    dial_code: "",
    phone_length: 0,
  },
];

const defaultValue = countries[1]; 

test("renders the component with default value", () => {
  render(<CustomerSelector countries={countries} defaultValue={countries[1]} updateSelectedCountry={mockUpdateSelectedCountry} />);

  const defaultCountryName = countries[1].name;
  expect(screen.getByText(defaultCountryName)).toBeInTheDocument();
});

test("opens and closes the dropdown when clicked", () => {
  render(
    <CustomerSelector
      countries={countries}
      updateSelectedCountry={mockUpdateSelectedCountry}
      defaultValue={defaultValue}
    />
  );

  const dropdownToggleButton = screen.getByLabelText(defaultValue.name);
  fireEvent.click(dropdownToggleButton);

  const countryOption = screen.getByText(
    `${countries[1].name} (${countries[1].dial_code})`
  );
  expect(countryOption).toBeInTheDocument();

  fireEvent.click(dropdownToggleButton); 
  expect(countryOption).not.toBeInTheDocument();
});



test("filters countries based on search input", () => {
  render(
    <CustomerSelector
      countries={countries}
      updateSelectedCountry={mockUpdateSelectedCountry}
      defaultValue={defaultValue}
    />
  );

  const dropdownToggleButton = screen.getByLabelText(defaultValue.name);
  fireEvent.click(dropdownToggleButton);

  const searchInput = screen.getByPlaceholderText("Search...");
  fireEvent.change(searchInput, { target: { value: "2" } });

  
  expect(screen.getByText("Select a country")).toBeInTheDocument();
  expect(screen.queryByText("Country 1 (+1)")).not.toBeInTheDocument();
});
