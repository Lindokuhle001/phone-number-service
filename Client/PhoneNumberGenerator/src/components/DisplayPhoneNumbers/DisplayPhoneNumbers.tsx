import { useContext, useState } from "react";
import { PhoneNumbersContext } from "../../contexts/PhoneNumberContext";
import "./DisplayPhoneNumbers.css";
import DisplayGeneratedNumbers from "../DisplayGeneratedNumberss/DisplayGeneratedNumbers";
import DisplayValidatedNumbers from "../DisplayValidatedNumbers/DisplayValidatedNumbers";
import Loading from "../Loading/Loading";

function DisplayPhoneNumbers(): JSX.Element {
  const {
    phoneNumbers,
    selectedCountry,
    results,
    showResults,
    loading,
    errors,
  } = useContext(PhoneNumbersContext);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(phoneNumbers.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const jump50PagesAhead = () => {
    const newPage = Math.min(currentPage + 50, totalPages);
    setCurrentPage(newPage);
  };

  const goBack50Pages = () => {
    const newPage = Math.max(currentPage - 50, 1);
    setCurrentPage(newPage);
  };

  const getPageNumbers = () => {
    const firstPage = 1;
    const lastPage = totalPages;
    const current = currentPage;

    const pages = [];
    if (totalPages <= 5) {
      for (let i = firstPage; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = firstPage; i <= 3; i++) {
          pages.push(i);
        }
      } else if (current >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  const visiblePages = getPageNumbers();

  if (errors.error) {
    return <div id="error-screen">{errors.message}</div>;
  } else if (loading) {
    return (
      <div id="loading-screen">
        <Loading data-testid="loading-screen"/>
      </div>
    );
  } else {
    return (
      <section className="phone-number-table">
        <div id="results" className={showResults ? "show" : "hide"}>
          Out of the {results.numberOfGenerated} numbers generated,{" "}
          {results.valid} were found to be valid for the country, which
          calculates to{" "}
          {((results.valid / results.numberOfGenerated) * 100).toFixed(2)}%
          valid results
        </div>

        {showResults ? (
          <DisplayValidatedNumbers
            currentPage={currentPage}
            validatedPhoneNumbers={results.validated}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          <div
            className={results.generated ? "show-generated-numbers" : "hide"}
          >
            <DisplayGeneratedNumbers
              currentPage={currentPage}
              phoneNumbers={phoneNumbers}
              itemsPerPage={itemsPerPage}
              selectedCountry={selectedCountry}
            />
          </div>
        )}

        {(results.generated && results.validated) && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="pagination-btn"
              onClick={() => goBack50Pages()}
              disabled={currentPage - 50 < 1}
            >
              -50
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={
                  currentPage === page
                    ? "pagination-btn-secondary active"
                    : "pagination-btn-secondary"
                }
              >
                {page}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() => jump50PagesAhead()}
              disabled={currentPage + 50 > totalPages}
            >
              +50
            </button>
            <button
              className="pagination-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    );
  }
}

export default DisplayPhoneNumbers;
