/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import DisplayValidatedNumbers from '../DisplayValidatedNumbers';

// Mock your ValidatedPhoneNumber data
const validatedPhoneNumbers = [
  {
    phoneNumber: '1234567890',
    phoneNumberType: 'Mobile',
    isValid: false,
    isValidLength: true,
    countryCode: 'US',
  },
  // Add more mock data as needed
];

describe('DisplayValidatedNumbers component', () => {
  it('renders the component with data', () => {
    const currentPage = 1;
    const itemsPerPage = 10;

    render(
      <DisplayValidatedNumbers
        validatedPhoneNumbers={validatedPhoneNumbers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    );

    // Ensure that the component renders correctly
    expect(screen.getByText('Validated Phone Number Table')).toBeInTheDocument();
    expect(screen.getByText('Country Code US')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2); // 1 header row + 1 data row
  });

  it('renders the correct data', () => {
    const currentPage = 1;
    const itemsPerPage = 10;

    render(
      <DisplayValidatedNumbers
        validatedPhoneNumbers={validatedPhoneNumbers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    );

    // Ensure that the data is displayed correctly
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
