import "./App.css";
import PhoneNumberGenerator from "./components/PhoneNumberGenerator/PhoneNumberGenerator";
import DisplayPhoneNumbers from "./components/DisplayPhoneNumbers/DisplayPhoneNumbers";
import { PhoneNumbersContextProvider } from "./contexts/PhoneNumberContext";
function App() {
  return (
    <>
      <PhoneNumbersContextProvider>
        <PhoneNumberGenerator />
        <DisplayPhoneNumbers />
      </PhoneNumbersContextProvider>
    </>
  );
}

export default App;
