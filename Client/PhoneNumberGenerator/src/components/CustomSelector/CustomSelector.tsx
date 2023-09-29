import React, { useState, useEffect, useRef } from "react";
import { Country } from "../../types";
import "./CustomSelector.css";

interface CustomerSelectorProps {
  countries: Country[];
  updateSelectedCountry: (country: Country) => void;
  defaultValue: Country;
}

const CustomerSelector: React.FC<CustomerSelectorProps> = (props) => {
  const { countries, updateSelectedCountry, defaultValue } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultValue);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdownVisibility = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    updateSelectedCountry(country);
    setIsOpen(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="customer-selector">
      <div
        className={`dropdown ${isOpen ? "open" : ""}`}
        ref={dropdownRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-owns="country-options"
        aria-controls="country-options"
      >
        <div
          className="selected"
          onClick={toggleDropdownVisibility}
          aria-label={selectedCountry.name}
        >
          {selectedCountry.name}
        </div>
        {isOpen && (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="search-input"
            aria-label="Search countries"
          />
        )}
        <ul
          className="options"
          id="country-options"
          role="listbox"
          aria-hidden={!isOpen}
        >
          {isOpen &&
            filteredCountries.map((country, index) => (
              <li
                key={index}
                role="option"
                aria-selected={selectedCountry.name === country.name}
                onClick={() => handleCountrySelect(country)}
              >
                {`${country.name} (${country.dial_code})`}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerSelector;
