import React, { createContext, useState } from "react";
import {
  Country,
  CustomError,
  PhoneNumber,
  PhoneNumbersContextType,
  Results,
} from "../types";

const initialPhoneNumbersContext: PhoneNumbersContextType = {
  phoneNumbers: [],
  selectedCountry: {
    name: "Select a country",
    code: "",
    dial_code: "",
    phone_length: 0,
  },
  results: {
    validated: [],
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

export const PhoneNumbersContext = createContext<PhoneNumbersContextType>(
  initialPhoneNumbersContext
);

export function PhoneNumbersContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>(
    initialPhoneNumbersContext.phoneNumbers
  );

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    initialPhoneNumbersContext.selectedCountry
  );

  const [results, setResults] = useState<Results>(
    initialPhoneNumbersContext.results
  );

  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState(initialPhoneNumbersContext.errors);

  function updateLoading(loading: boolean) {
    setLoading(loading);
  }

  function updateShowResults(show: boolean) {
    setShowResults(show);
  }

  function updateResults(results: Results) {
    setResults(results);
  }

  function updateSelectedCountry(country: Country) {
    updateErrors(null)
    setSelectedCountry(country);
  }

  function updatePhoneNumbers(newPhoneNumbers: PhoneNumber[]) {
    setPhoneNumbers(newPhoneNumbers);
  }

  function updateErrors(error: CustomError |null) {
    if (error === null) {
      error = {
        error: false,
        message: "",
      };
    }
    setErrors(error);
  }

  const value = {
    results,
    updateResults,
    showResults,
    updateShowResults,
    phoneNumbers,
    updatePhoneNumbers,
    selectedCountry,
    updateSelectedCountry,
    errors,
    updateErrors,
    loading,
    updateLoading,
  };

  return (
    <PhoneNumbersContext.Provider value={value}>
      {children}
    </PhoneNumbersContext.Provider>
  );
}
