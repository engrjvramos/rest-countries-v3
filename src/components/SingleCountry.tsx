import { Link } from "react-router-dom";
import lookup from "country-code-lookup";
import { FlagDisplay } from "../enums/FlagDisplay";
import { CgSpinnerTwo } from "react-icons/cg";

interface Props {
  name: string;
  officialName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  currencies: any;
  languages: any;
  tld: string[];
  flag: string;
  coatOfArms: string;
  flagAlt: string;
  borders: string[];
  flagDisplay: string;
}

const SingleCountry = ({
  name,
  officialName,
  population,
  region,
  subregion,
  capital,
  languages,
  currencies,
  tld,
  borders,
  flag,
  coatOfArms,
  flagAlt,
  flagDisplay,
}: Props) => {
  return (
    <div className="grid lg:grid-cols-2 gap-x-20 gap-y-5 mt-12 place-items-center">
      <div className="sm:h-[400px] relative">
        <img
          src={flagDisplay === FlagDisplay.Flag ? flag : coatOfArms}
          alt={
            flagDisplay === FlagDisplay.Flag ? flagAlt : `${name} Coat of Arms`
          }
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold my-8">{name}</h1>
        <div className="grid lg:grid-cols-2 gap-10 mb-10">
          <div className="grid gap-2 content-start text-[15px]">
            <p>
              <span className="font-semibold">Official Name: </span>
              {officialName}
            </p>
            <p>
              <span className="font-semibold">Population: </span>
              {population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region: </span>
              {region}
            </p>
            <p>
              <span className="font-semibold">Subregion: </span>
              {subregion}
            </p>
            {capital && (
              <p>
                <span className="font-semibold">Capital: </span>
                {capital}
              </p>
            )}
          </div>
          <div className="grid gap-2 content-start text-[15px]">
            <p>
              <span className="font-semibold">Top Level Domain: </span>
              {tld}
            </p>
            <p>
              <span className="font-semibold">Currencies: </span>
              {Object?.keys(currencies || {}).map((key, index) => (
                <span key={index}>
                  {currencies[key].name}
                  {index !== Object.keys(currencies || {}).length - 1
                    ? ", "
                    : ""}
                </span>
              ))}
            </p>
            <p>
              <span className="font-semibold">Languages: </span>
              {Object?.keys(languages || {}).map((key, index) => (
                <span key={index}>
                  {languages[key]}
                  {index === Object.keys(languages || {}).length - 1
                    ? ""
                    : ", "}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Border Countries:</p>
          {borders ? (
            <ul className="flex items-center flex-wrap gap-3 my-5 text-sm">
              {borders.map((border, index) => (
                <li
                  key={index}
                  className="py-2 px-5 shadow-md borderCountry hover:-translate-y-[7px] hover:text-amber-500 dark:bg-darkBlue dark:text-white dark:hover:text-amber-500"
                >
                  <Link to={`/${lookup.byIso(border)?.country}`}>
                    {lookup.byIso(border)?.country}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="my-5">None</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCountry;
