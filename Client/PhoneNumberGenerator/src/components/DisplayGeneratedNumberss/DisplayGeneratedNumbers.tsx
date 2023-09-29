import { Country, PhoneNumber } from "../../types";

type DisplayGeneratedNumbersProps = {
  phoneNumbers:PhoneNumber[];
  currentPage:number;
  itemsPerPage:number;
  selectedCountry:Country
}

function DisplayGeneratedNumbers({phoneNumbers,currentPage,itemsPerPage,selectedCountry}:DisplayGeneratedNumbersProps) {
  return (
    <>
      <h2>Phone Number Table</h2>
      <table>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          {phoneNumbers
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((phoneNumber:PhoneNumber, index:number) => (
              <tr key={`${phoneNumber} ${index}`}>
                <td>{phoneNumber.phoneNumber}</td>
                <td>{selectedCountry.name}</td>
                <td>{selectedCountry.dial_code}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default DisplayGeneratedNumbers;
