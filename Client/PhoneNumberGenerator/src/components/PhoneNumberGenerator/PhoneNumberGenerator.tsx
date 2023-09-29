import React, { useContext, useEffect, useState } from "react";
import CustomerSelector from "../CustomSelector/CustomSelector";
import { PhoneNumbersContext } from "../../contexts/PhoneNumberContext";
import "./PhoneNumberGenerator.css";
import { Country, PhoneNumber, ServerResponse } from "../../types";

const API_BASE_URL = "http://localhost:9000/api";
const API_COUNTRIES_URL = `${API_BASE_URL}/countries`;
const API_VALIDATE_PHONE_URL = `${API_BASE_URL}/validate-phone-number`;

const ERROR_MESSAGE_COUNTRIES = "There was error loading countries please refresh and try again";
const ERROR_MESSAGE_VALIDATE = "There was error validating phone numbers please refresh and try again";
const ERROR_MESSAGE_SELECT_COUNTRY = "Please select a country";
const ERROR_MESSAGE_GENERATE_NUMBERS_FIRST = "Please generate numbers before submiting";

function PhoneNumberGenerator() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [quantity, setQuantity] = useState(1);

  const {
    results,
    selectedCountry,
    updatePhoneNumbers,
    updateSelectedCountry,
    updateResults,
    updateShowResults,
    updateErrors,
    updateLoading,
  } = useContext(PhoneNumbersContext);

  const getSelectedCountry = (country: Country) => {
    updateSelectedCountry(country);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_COUNTRIES_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error loading countries:", error);
        updateErrors({
          error: true,
          message: ERROR_MESSAGE_COUNTRIES,
        });
      }
    };

    fetchData();
  }, []);

  const preventNonDigits = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "Delete"];
    if (!/^[0-9\b]+$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleGenerateClick = () => {
    if (selectedCountry.code === "") {
      updateErrors({ error: true, message:ERROR_MESSAGE_SELECT_COUNTRY  });
      return
    }

    updateErrors({ error: false, message: "" });
    const generatedNumbers = generateRandomNumbers(quantity);
    updatePhoneNumbers(generatedNumbers);
    updateShowResults(false);
    updateResults({
      validated: [],
      valid: 0,
      numberOfGenerated: quantity,
      generated: true,
    });
  };

  const generateRandomNumbers = (quantity: number): PhoneNumber[] => {
    const result: PhoneNumber[] = [];

    for (let i = 0; i < quantity; i++) {
      let randomString = "";
      const characters = "0123456789";
      let phoneLengths: number[] = [];
      if (Array.isArray(selectedCountry.phone_length)) {
        phoneLengths = selectedCountry.phone_length;
      } else {
        phoneLengths.push(selectedCountry.phone_length);
      }

      const phoneLengthsIndex = Math.floor(Math.random() * phoneLengths.length);

      for (let j = 0; j < phoneLengths[phoneLengthsIndex]; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      randomString = selectedCountry.dial_code + randomString;
      result.push({ phoneNumber: randomString });
    }

    return result;
  };

  const processServerResponse = (response: ServerResponse) => {
    const countValid = response.filter((item) => item.isValid).length;
    updateResults({
      validated: response,
      valid: countValid,
      numberOfGenerated: quantity,
      generated: false,
    });
    updateShowResults(true);
    updateLoading(false);
  };

  const handleSubmitClick = async () => {
    if (selectedCountry.code === "" ) {
      updateErrors({ error: true, message:ERROR_MESSAGE_SELECT_COUNTRY  });
      return
    }else if(!results.generated){
      updateErrors({ error: true, message:ERROR_MESSAGE_GENERATE_NUMBERS_FIRST  });
      return
    }

    updateErrors(null);
    updateLoading(true);
    try {
      const response = await fetch(API_VALIDATE_PHONE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumbers: generateRandomNumbers(quantity),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      processServerResponse(data);
    } catch (error) {
      console.error("Error sending POST request:", error);
      updateErrors({
        error: true,
        message: ERROR_MESSAGE_VALIDATE,
      });
    }
  };

  return (
    <section id="PhoneNumberGenerator">
      <label htmlFor="selectCountry">
        <CustomerSelector
          countries={countries}
          updateSelectedCountry={getSelectedCountry}
          defaultValue={selectedCountry}
          aria-labelledby="selectCountryLabel"
        />
      </label>

      <label htmlFor="quantityInput">
        <input
          id="quantityInput"
          type="number"
          max={10000}
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Enter number"
          onKeyDown={preventNonDigits}
          aria-labelledby="quantityInputLabel"
        />
      </label>

      <button onClick={handleGenerateClick} aria-label="Generate">
        Generate
      </button>
      <button onClick={handleSubmitClick} aria-label="Submit">
        Submit
      </button>
    </section>
  );
}

export default PhoneNumberGenerator;
