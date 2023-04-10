import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import SingleCountry from "../components/SingleCountry";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { AiFillFlag } from "react-icons/ai";
import { GiEdgedShield } from "react-icons/gi";
import { FlagDisplay } from "../enums/FlagDisplay";
import { Tooltip } from "react-tooltip";

interface CountryProps {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  subregion: string;
  borders: string[];
  capital: string[];
  flags: {
    svg: string;
    alt: string;
  };
  coatOfArms: {
    svg: string;
  };
  cca3: string;
  area: number;
  languages: { code: string; name: string }[];
  currencies: { code: string; name: string; symbol: string }[];
  tld: string[];
}

export default function CountryDetails() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [country, setCountry] = useState<CountryProps[]>([]);
  const [flagDisplay, setFlagDisplay] = useState<string>(FlagDisplay.Flag);

  const toggleFlagDisplay = () => {
    flagDisplay === FlagDisplay.Flag
      ? setFlagDisplay(FlagDisplay.CoatOfArms)
      : setFlagDisplay(FlagDisplay.Flag);
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<CountryProps[]>(
          `https://restcountries.com/v3.1/name/${code}?fullText=true`,
        );
        const data = response.data;
        setIsLoading(false);
        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
    window.scrollTo(0, 0);
  }, [code]);

  return (
    <main className="countryPage">
      <div className="max-w-7xl mx-auto py-10 px-5">
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className="shadow-lg py-3 px-6 rounded inline-flex items-center dark:bg-darkBlue dark:text-white text-sm"
          >
            <BsArrowLeft className="mr-2" />
            Back
          </button>
          {flagDisplay === FlagDisplay.Flag ? (
            <>
              <button
                className="shadow-lg py-3 px-4 rounded inline-flex items-center dark:bg-darkBlue dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-amber-500"
                onClick={toggleFlagDisplay}
                data-tooltip-id="coatOfArms"
                data-tooltip-content="Show Coat of Arms"
              >
                <GiEdgedShield className="h-5 w-5" />
              </button>
              <Tooltip id="coatOfArms" place="bottom" />
            </>
          ) : (
            <>
              <button
                className="shadow-lg py-3 px-4 rounded inline-flex items-center dark:bg-darkBlue dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-amber-500"
                onClick={toggleFlagDisplay}
                data-tooltip-id="countryFlag"
                data-tooltip-content="Show Flag"
              >
                <AiFillFlag className="h-5 w-5" />
              </button>
              <Tooltip id="countryFlag" place="bottom" />
            </>
          )}
        </div>
        {isLoading && (
          <FaSpinner className="w-16 h-16 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animateSpinner" />
        )}
        {!isLoading &&
          country.map((item, index) => (
            <SingleCountry
              key={index}
              flag={item.flags.svg}
              name={item.name.common}
              officialName={item.name.official}
              population={item.population}
              region={item.region}
              subregion={item.subregion}
              capital={item.capital}
              borders={item.borders}
              currencies={item.currencies}
              languages={item.languages}
              flagAlt={item.flags.alt}
              tld={item.tld}
              coatOfArms={item.coatOfArms.svg}
              flagDisplay={flagDisplay}
            />
          ))}
      </div>
    </main>
  );
}
