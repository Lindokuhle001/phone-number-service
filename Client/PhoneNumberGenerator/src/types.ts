export type Country = {
  name: string;
  code: string;
  dial_code: string;
  phone_length: number | number[];
};


export type PhoneNumber = {
  phoneNumber: string;
};

export type Results = {
  validated: ValidatedPhoneNumber[];
  numberOfGenerated: number;
  generated: boolean;
  valid: number;
};

export type ServerResponse = ValidatedPhoneNumber[];

export type ValidatedPhoneNumber = {
  phoneNumber: string;
  countryCode: string;
  phoneNumberType: string;
  isValid: boolean;
  isValidLength: boolean;
};

export type PhoneNumbersContextType = {
  phoneNumbers: PhoneNumber[];
  selectedCountry: Country;
  results: Results;
  showResults: boolean;
  errors: {
    error: boolean;
    message: string;
  };
  loading: boolean;

  updateShowResults: (show: boolean) => void;
  updateLoading: (show: boolean) => void;

  updateResults: (results: Results) => void;
  updatePhoneNumbers: (phoneNumbers: PhoneNumber[]) => void;
  updateSelectedCountry: (country: Country) => void;
  updateErrors: (error:CustomError |null) => void;
};
export type CustomError = {
  error:boolean;
  message:string
}