import { ValidatedPhoneNumber } from '../../types';
type DisplayValidatedNumbersProps = {
    validatedPhoneNumbers:ValidatedPhoneNumber[]
    currentPage:number;
    itemsPerPage:number;
  }
function DisplayValidatedNumbers({validatedPhoneNumbers,currentPage,itemsPerPage}:DisplayValidatedNumbersProps) {
  return (
        <div className="additional-phone-number-table">
          <h2>Validated Phone Number Table</h2>

          <h3>Country Code {validatedPhoneNumbers[0].countryCode}</h3>
          <table>
            <thead>
              <tr>
                <th>Phone Number</th>
                <th>Phone Number Type</th>
                <th>Is Valid</th>
                <th>Is Valid Length</th>
              </tr>
            </thead>
            <tbody>
              {validatedPhoneNumbers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((phoneNumber:ValidatedPhoneNumber, index:number) => (
                <tr key={`${phoneNumber.phoneNumber} ${index}`}>
                  <td>{phoneNumber.phoneNumber}</td>
                  <td>{phoneNumber.phoneNumberType}</td>
                  <td>{phoneNumber.isValid ? "Yes" : "No"}</td>
                  <td>{phoneNumber.isValidLength ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  
}

export default DisplayValidatedNumbers