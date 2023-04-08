import { useState, useEffect } from "react";
import FilterByRegion from "../components/FilterByRegion";
import Search from "../components/Search";
import axios from "axios";
import Card from "../components/Card";
import { FaSpinner, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Paginate from "../enums/Paginate";
import ReactPaginate from "react-paginate";

interface CountriesProps {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: [string];
  flags: {
    svg: string;
    alt: string;
  };
  cca3: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<CountriesProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [regionFilter, setRegionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<CountriesProps[]>(
          "https://restcountries.com/v3.1/all",
        );
        const data = response.data;
        setIsLoading(false);
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (regionFilter === "" || country.region === regionFilter),
  );

  const pageCount = Math.ceil(filteredCountries.length / Paginate.PageSize);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * Paginate.PageSize;
  const endIndex = startIndex + Paginate.PageSize;

  const displayedCountries = filteredCountries.slice(startIndex, endIndex);

  return (
    <main>
      <div className="max-w-7xl mx-auto sm:px-5 px-10 pb-10">
        <div className="flex items-center justify-between gap-5 flex-col lg:flex-row">
          <Search searchTerm={searchTerm} handleSearch={handleSearch} />
          <FilterByRegion
            regionFilter={regionFilter}
            setRegionFilter={setRegionFilter}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {isLoading && (
          <FaSpinner className="w-16 h-16 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animateSpinner" />
        )}
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10 relative">
          {countries &&
            !isLoading &&
            (displayedCountries.length > 0 ? (
              displayedCountries.map((country) => (
                <Card
                  key={country.cca3}
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  flagImg={country.flags.svg}
                  flagAlt={country.flags.alt}
                />
              ))
            ) : (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
                No results found.
              </p>
            ))}
        </ul>

        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageChange}
              marginPagesDisplayed={0}
              pageRangeDisplayed={0}
              containerClassName="flex justify-between items-center w-full"
              previousLabel="Previous"
              nextLabel="Next"
              previousClassName="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              nextClassName="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              pageClassName="hidden"
              initialPage={0}
              forcePage={currentPage}
            />
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-semibold text-veryDarkBlue2 dark:text-white">
                  {" "}
                  {Math.min(
                    currentPage * Paginate.PageSize + 1,
                    filteredCountries.length,
                  )}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-veryDarkBlue2 dark:text-white">
                  {Math.min(
                    (currentPage + 1) * Paginate.PageSize,
                    filteredCountries.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-veryDarkBlue2 dark:text-white">
                  {filteredCountries.length}
                </span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {pageCount > 1 && (
                  <ReactPaginate
                    previousLabel={
                      <FaChevronLeft
                        className="h-4 w-4 m-[2px]"
                        aria-hidden="true"
                      />
                    }
                    nextLabel={
                      <FaChevronRight
                        className="h-4 w-4 m-[2px]"
                        aria-hidden="true"
                      />
                    }
                    breakLabel="..."
                    breakClassName="relative inline-flex items-center text-sm font-semibold hover:bg-amber-200 text-gray-700 dark:text-white dark:hover:bg-amber-500
dark:hover:bg-amber-500
dark:hover:bg-amber-500 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                    breakLinkClassName="px-4 py-2"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName="flex justify-center items-center"
                    pageClassName="relative hidden items-center text-sm font-semibold text-veryDarkBlue2 dark:text-white ring-1 dark:hover:bg-amber-500 ring-inset ring-gray-300 hover:bg-amber-200 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    pageLinkClassName="px-4 py-2"
                    previousClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-white dark:hover:bg-amber-500 ring-1 ring-inset ring-gray-300 hover:bg-amber-200 focus:z-20 focus:outline-offset-0"
                    nextClassName="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-white dark:hover:bg-amber-500 ring-1 ring-inset ring-gray-300 hover:bg-amber-200 focus:z-20 focus:outline-offset-0"
                    activeClassName="relative z-10 inline-flex items-center bg-amber-500 text-sm  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                    activeLinkClassName="text-veryDarkBlue2 dark:text-white hover:bg-amber-500 font-bold"
                    initialPage={0}
                    forcePage={currentPage}
                  />
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
